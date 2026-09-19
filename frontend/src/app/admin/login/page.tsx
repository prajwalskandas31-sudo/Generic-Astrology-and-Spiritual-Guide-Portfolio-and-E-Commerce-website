"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PREDEFINED_ADMIN_ACCOUNTS, setCurrentAdminUser, logAuditEvent, verifyAdminPassword } from "@/lib/api-client";
import { AdminUser } from "@/types";
import { Sparkles, Lock, Mail, Loader2, ArrowLeft, ShieldCheck, UserCheck, Crown, User } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<AdminUser>(PREDEFINED_ADMIN_ACCOUNTS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAccountSelect = (acc: AdminUser) => {
    setSelectedAccount(acc);
    setEmail(acc.email);
    setPassword(""); // Keep password completely empty
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Find matching predefined account or use selected
      const matched = PREDEFINED_ADMIN_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === email.trim().toLowerCase()
      ) || selectedAccount;

      // Verify password against active credential store
      const isValidPassword = verifyAdminPassword(matched.email, password);
      if (!isValidPassword) {
        setErrorMsg(`Invalid password for ${matched.email}. Please enter your correct password.`);
        setIsLoading(false);
        return;
      }

      // Try Supabase Auth
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: matched.email,
          password,
        });

        if (data?.session?.access_token) {
          matched.token = data.session.access_token;
        }
      } catch (_) {}

      // Set active user state
      setCurrentAdminUser(matched);

      // Record Audit Event for Login
      logAuditEvent({
        action_category: "LOGIN",
        action_summary: `${matched.name} (${matched.title}) logged into the Admin Portal`,
        target_resource: "System Authentication",
        user_name: matched.name,
        user_email: matched.email,
        user_role: matched.role,
        details: {
          role: matched.role,
          title: matched.title,
          auth_method: "Direct Credential Verification",
        },
        severity: "INFO",
      });

      router.push("/admin");
    } catch (err: any) {
      setErrorMsg("Authentication failed. Please check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-slate-900 font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-amber-200/50 space-y-8 relative">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Website</span>
          </Link>

          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Multi-Account System
          </span>
        </div>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-900 text-amber-200 flex items-center justify-center mx-auto shadow-md border border-amber-700">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Admin Portal Sign-In
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Authorized management &amp; audit portal for Veda Brahma Shri Pradeep Nadig platform.
          </p>
        </div>

        {/* Account Selector Tabs */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
            Select Account Profile
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PREDEFINED_ADMIN_ACCOUNTS.map((acc) => {
              const isSelected = selectedAccount.id === acc.id;
              const isPrincipal = acc.role === "PRINCIPAL_ADMIN";
              const isMaster = acc.role === "MASTER_ADMIN";
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleAccountSelect(acc)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-amber-900 text-amber-100 border-amber-700 ring-2 ring-amber-500/30 shadow-md"
                      : "bg-amber-50/40 hover:bg-amber-100/60 border-amber-200/80 text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    {isPrincipal ? (
                      <Crown className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-amber-700"}`} />
                    ) : isMaster ? (
                      <ShieldCheck className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-amber-700"}`} />
                    ) : (
                      <UserCheck className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-amber-700"}`} />
                    )}
                    <span className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">
                      {acc.role === "PRINCIPAL_ADMIN" ? "Principal" : acc.role === "MASTER_ADMIN" ? "Master" : "Staff"}
                    </span>
                  </div>
                  <div className="font-bold text-xs line-clamp-1">{acc.name}</div>
                  <div className="text-[10px] opacity-75 line-clamp-1">{acc.email}</div>
                </button>
              );
            })}
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Account Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="Enter account password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-amber-900 hover:bg-amber-950 text-amber-100 font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating {selectedAccount.name}...</span>
              </>
            ) : (
              <span>Sign In as {selectedAccount.name}</span>
            )}
          </button>
        </form>

        <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/70 text-[11px] text-amber-950 text-center leading-relaxed">
          🔒 <strong>Audit Logging Enabled</strong>: Logins &amp; administrative actions are recorded in the <strong>Principal Admin Audit Logs Center</strong> for safety and transparency.
        </div>
      </div>
    </div>
  );
}
