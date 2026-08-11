"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Flame, Flower2, ChevronDown } from "lucide-react";

export interface NavigationProps {
  siteName?: string;
}

export default function Navigation({ siteName = "Veda Brahma Shri Pradeep Nadig" }: NavigationProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesSubmenu = [
    {
      name: "Vedic Homas & Rituals",
      href: "/services#homas",
      desc: "Ganapathi, Navagraha, Mrityunjaya & more",
      icon: Flame,
    },
    {
      name: "Sacred Poojas & Parayanas",
      href: "/services#poojas",
      desc: "Satyanarayana, Rudrabhishekam, Lakshmi & more",
      icon: Flower2,
    },
    {
      name: "Astrology Consultations",
      href: "/services#consultations",
      desc: "Horoscope analysis & remedies",
      icon: Sparkles,
    },
  ];

  const navLinks = [
    { name: "About", href: "/" },
    { name: "Services", href: "/services", hasSubmenu: true },
    { name: "Workshops", href: "/workshops" },
    { name: "Classes", href: "/classes" },
    { name: "Courses", href: "/courses" },
    { name: "Live Events", href: "/live-events" },
    { name: "Blogs", href: "/blogs" },
    { name: "Gallery", href: "/gallery" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo / Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-amber-700 text-amber-950 flex items-center justify-center font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-900" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl text-amber-950 tracking-tight leading-snug group-hover:text-amber-700 transition-colors">
                {siteName}
              </span>
              <span className="text-xs text-amber-700 font-medium tracking-wide uppercase">
                Vedic Scholar &amp; Spiritual Guide
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              if (link.hasSubmenu) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-amber-100 text-amber-900 font-semibold shadow-xs"
                          : "text-slate-700 hover:text-amber-800 hover:bg-amber-50/80"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-800 group-hover:rotate-180 transition-transform" />
                    </Link>

                    {/* Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute left-0 top-full pt-2 w-72 z-50 animate-fadeIn">
                        <div className="bg-white rounded-2xl p-2 shadow-xl border border-amber-200/80 space-y-1">
                          {servicesSubmenu.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setServicesDropdownOpen(false)}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-amber-50 transition-colors group/item"
                              >
                                <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-amber-700 group-hover/item:text-white transition-colors">
                                  <SubIcon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900 text-xs group-hover/item:text-amber-900">
                                    {sub.name}
                                  </div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1">
                                    {sub.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-amber-100 text-amber-900 font-semibold shadow-xs"
                      : "text-slate-700 hover:text-amber-800 hover:bg-amber-50/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-amber-900 hover:bg-amber-50 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-amber-100 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            if (link.hasSubmenu) {
              return (
                <div key={link.name} className="space-y-1">
                  <div className="flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-amber-50">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 font-medium"
                    >
                      {link.name}
                    </Link>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="p-1 rounded-md text-amber-800 hover:bg-amber-100"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {mobileServicesOpen && (
                    <div className="pl-6 space-y-1 border-l-2 border-amber-200 ml-4 py-1">
                      {servicesSubmenu.map((sub) => {
                        const SubIcon = sub.icon;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:text-amber-900 hover:bg-amber-50"
                          >
                            <SubIcon className="w-4 h-4 text-amber-700 shrink-0" />
                            <span>{sub.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  active
                    ? "bg-amber-100 text-amber-900 font-semibold"
                    : "text-slate-700 hover:bg-amber-50 hover:text-amber-800"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

