"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, render standalone
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Offerings", href: "/admin/offerings", icon: BookOpen },
    { name: "Workshops", href: "/admin/workshops", icon: Calendar },
    { name: "Classes", href: "/admin/classes", icon: GraduationCap },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Media Library", href: "/admin/media", icon: FolderOpen },
    { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
    { name: "Enquiries & Regs", href: "/admin/enquiries", icon: MessageSquare },
    { name: "Accepted Schedule", href: "/admin/accepted", icon: CalendarCheck },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-amber-950 text-white flex flex-col justify-between shrink-0 border-r border-amber-800/60 shadow-xl">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-800 text-amber-200 flex items-center justify-center font-bold shadow-xs">
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

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                    active
                      ? "bg-amber-700 text-white font-bold shadow-md border-l-4 border-amber-300 pl-3"
                      : "text-amber-50 hover:bg-amber-800/80 hover:text-white font-medium"
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 ${active ? "text-amber-300" : "text-amber-200/80"}`} />
                  <span>{item.name}</span>
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
