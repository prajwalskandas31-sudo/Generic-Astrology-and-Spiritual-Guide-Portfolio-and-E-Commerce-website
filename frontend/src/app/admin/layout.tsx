"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
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
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-amber-900 text-slate-300 flex flex-col justify-between shrink-0 border-r border-amber-200/80">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-700 text-amber-200 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-base text-amber-950 block leading-snug">
                Admin CMS
              </span>
              <span className="text-[10px] text-amber-800 font-medium tracking-wide uppercase">
                Pradeep Nadig Portal
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    active
                      ? "bg-amber-700 text-white font-semibold shadow-xs"
                      : "text-slate-400 hover:bg-amber-900 hover:text-amber-900"
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-amber-200/80">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-900 hover:bg-red-950 text-slate-300 hover:text-red-300 rounded-xl text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
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
