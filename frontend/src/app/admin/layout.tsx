"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentAdminUser, logAuditEvent } from "@/lib/api-client";
import { AdminUser } from "@/types";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CalendarCheck,
  GraduationCap,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  MessageSquare,
  Settings,
  FolderOpen,
  LogOut,
  Sparkles,
  BookOpenCheck,
  Radio,
  Star,
  Activity,
  ShieldCheck,
  Crown,
  UserCheck,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentAdminUser());
  }, [pathname]);

  // If on login page, render standalone
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const user = currentUser || getCurrentAdminUser();
  const isPrincipalAdmin = user.role === "PRINCIPAL_ADMIN";

  const baseNavItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Offerings", href: "/admin/offerings", icon: BookOpen },
    { name: "Workshops", href: "/admin/workshops", icon: Calendar },
    { name: "Classes", href: "/admin/classes", icon: GraduationCap },
    { name: "Courses", href: "/admin/courses", icon: BookOpenCheck },
    { name: "Event Management", href: "/admin/live-events", icon: Radio },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Media Library", href: "/admin/media", icon: FolderOpen },
    { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
    { name: "Enquiries & Regs", href: "/admin/enquiries", icon: MessageSquare },
    { name: "Client Reviews", href: "/admin/reviews", icon: Star },
    { name: "Accepted Schedule", href: "/admin/accepted", icon: CalendarCheck },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  // Exclusive Principal Admin items
  const navItems = isPrincipalAdmin
    ? [
        ...baseNavItems,
        { name: "Audit Logs", href: "/admin/audit-logs", icon: Activity, isSpecial: true },
      ]
    : baseNavItems;

  const handleLogout = () => {
    logAuditEvent({
      action_category: "LOGOUT",
      action_summary: `${user.name} signed out of the Admin Portal`,
      target_resource: "System Authentication",
      severity: "INFO",
    });
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-amber-950 text-white flex flex-col justify-between shrink-0 border-r border-amber-800/60 shadow-xl">
        <div className="p-5 space-y-6">
          {/* Header Brand */}
          <div className="flex items-center gap-3 pb-4 border-b border-amber-900/60">
            <div className="w-9 h-9 rounded-xl bg-amber-800 text-amber-200 flex items-center justify-center font-bold shadow-xs shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-base text-white block leading-snug">
                Admin CMS
              </span>
              <span className="text-[10px] text-amber-300 font-semibold tracking-wide uppercase">
                Pradeep Nadig Portal
              </span>
            </div>
          </div>

          {/* Logged In User Profile Card */}
          <div className="p-3.5 rounded-2xl bg-amber-900/80 border border-amber-800/80 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs shrink-0 ${user.avatar_color || "bg-amber-700 text-white"}`}>
                {user.role === "PRINCIPAL_ADMIN" ? <Crown className="w-4 h-4 text-amber-300" /> : user.name.slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-white block truncate leading-tight">
                  {user.name}
                </span>
                <span className="text-[10px] text-amber-300/90 block truncate mt-0.5">
                  {user.email}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px]">
              <span className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                user.role === "PRINCIPAL_ADMIN"
                  ? "bg-amber-800/90 text-amber-100 border border-amber-600/60"
                  : user.role === "MASTER_ADMIN"
                  ? "bg-amber-900/90 text-amber-200 border border-amber-700/60"
                  : "bg-slate-800 text-slate-200 border border-slate-700"
              }`}>
                {user.role === "PRINCIPAL_ADMIN" ? "Principal Superadmin" : user.role === "MASTER_ADMIN" ? "Master Admin" : "Staff Admin"}
              </span>

              <Link
                href="/admin/login"
                className="text-amber-400 hover:text-amber-200 text-[10px] font-semibold underline"
              >
                Switch
              </Link>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const active = pathname === item.href;
              const isAuditLog = (item as any).isSpecial;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                    active
                      ? "bg-amber-700 text-white font-bold shadow-md border-l-4 border-amber-300 pl-3"
                      : isAuditLog
                      ? "text-amber-200 bg-amber-900/60 hover:bg-amber-800/80 font-bold border border-amber-700/50"
                      : "text-amber-50 hover:bg-amber-800/80 hover:text-white font-medium"
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${
                    active
                      ? "text-amber-300"
                      : isAuditLog
                      ? "text-amber-300"
                      : "text-amber-200/80"
                  }`} />
                  <span>{item.name}</span>
                  {isAuditLog && (
                    <span className="ml-auto text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                      Super
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-amber-800/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-900/90 hover:bg-red-800 text-white hover:text-white rounded-xl text-xs font-bold border border-amber-700/60 transition-all shadow-xs"
          >
            <LogOut className="w-4 h-4 text-amber-200" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="grow p-6 sm:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
