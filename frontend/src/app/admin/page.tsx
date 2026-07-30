"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api-client";
import { DashboardStats } from "@/types";
import {
  MessageSquare,
  Calendar,
  CreditCard,
  Plus,
  BookOpen,
  FolderOpen,
  FileText,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAPI<DashboardStats>("/admin/stats", {
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      setStats(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center text-slate-500 flex items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
        <span>Loading Admin Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Overview of recent enquiries, upcoming workshops, registrations, and quick CMS management actions.
        </p>
      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/offerings"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/60 text-amber-900 font-semibold text-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-amber-700" />
            <span>Add New Offering</span>
          </Link>
          <Link
            href="/admin/workshops"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/60 text-amber-900 font-semibold text-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-amber-700" />
            <span>Create Workshop</span>
          </Link>
          <Link
            href="/admin/blogs"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/60 text-amber-900 font-semibold text-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-amber-700" />
            <span>Publish Blog Post</span>
          </Link>
          <Link
            href="/admin/media"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs transition-colors"
          >
            <FolderOpen className="w-4 h-4 text-slate-700" />
            <span>Open Media Library</span>
          </Link>
        </div>
      </div>

      {/* 3-COLUMN MODULE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. RECENT ENQUIRIES */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>Recent Enquiries</span>
            </h2>
            <Link href="/admin/enquiries" className="text-xs font-semibold text-amber-800 hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {!stats?.recent_enquiries || stats.recent_enquiries.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No recent enquiries.</p>
            ) : (
              stats.recent_enquiries.map((enq) => (
                <div key={enq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{enq.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium text-[10px]">
                      {enq.status}
                    </span>
                  </div>
                  <div className="text-slate-500 flex justify-between">
                    <span>{enq.category}</span>
                    <span>{enq.mobile}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 2. UPCOMING WORKSHOPS */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>Upcoming Workshops</span>
            </h2>
            <Link href="/admin/workshops" className="text-xs font-semibold text-amber-800 hover:underline">
              Manage &rarr;
            </Link>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {!stats?.upcoming_workshops || stats.upcoming_workshops.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No active upcoming workshops.</p>
            ) : (
              stats.upcoming_workshops.map((ws) => (
                <div key={ws.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{ws.title}</span>
                    <span className="text-amber-800 font-semibold">₹{ws.price}</span>
                  </div>
                  <div className="text-slate-500 flex justify-between">
                    <span>Venue: {ws.venue || "N/A"}</span>
                    <span>{ws.batches.length} Batches</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. RECENT REGISTRATIONS */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-700" />
              <span>Recent Registrations</span>
            </h2>
            <Link href="/admin/enquiries" className="text-xs font-semibold text-amber-800 hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {!stats?.recent_registrations || stats.recent_registrations.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No registrations recorded yet.</p>
            ) : (
              stats.recent_registrations.map((reg) => (
                <div key={reg.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{reg.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        reg.payment_status === "Paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {reg.payment_status}
                    </span>
                  </div>
                  <div className="text-slate-500 flex justify-between">
                    <span>{reg.mobile} ({reg.city})</span>
                    <span>₹{reg.amount}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
