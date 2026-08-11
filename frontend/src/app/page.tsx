import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import { getSettings, getOfferings, getWorkshops } from "@/lib/api-client";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  PhoneCall,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Offering, Workshop } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  let settings: Record<string, any> = {};
  let featuredOfferings: Offering[] = [];
  let featuredWorkshops: Workshop[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    featuredOfferings = await getOfferings();
  } catch (_) {}

  try {
    featuredWorkshops = await getWorkshops();
  } catch (_) {}

  const heroTitle = settings.hero_title || "Veda Brahma Shri Pradeep Nadig";
  const heroSubtitle =
    settings.hero_subtitle ||
    "Vedic Scholar, Astrologer & Spiritual Guide committed to authentic traditions and sacred wisdom.";

  const navButtons = [
    { name: "Services", href: "/services", icon: BookOpen, count: "Homam & Rituals" },
    { name: "Consultations", href: "/services", icon: Sparkles, count: "Astrology & Guidance" },
    { name: "Workshops", href: "/workshops", icon: Calendar, count: "Chanting Sessions" },
    { name: "Classes", href: "/classes", icon: GraduationCap, count: "Vedic Learning" },
    { name: "Blogs", href: "/blogs", icon: FileText, count: "Articles & Insights" },
    { name: "Gallery", href: "/gallery", icon: ImageIcon, count: "Photos & Media" },
    { name: "FAQ", href: "/faq", icon: HelpCircle, count: "Questions Answered" },
    { name: "Contact", href: "/contact", icon: PhoneCall, count: "Get in Touch" },
  ];

  return (
    <PublicLayout settings={settings}>
      {/* 1. HERO SECTION WITH SHANKARI CREATIONS BRANDING */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-200/80">
        {/* Background Image with Soft Warm Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('/images/services/ganapathi-homa.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-100/90 via-amber-50/70 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: SHAANKARI CREATIONS LOGO */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center text-center order-2 lg:order-1">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-white/40 backdrop-blur-md p-4 border border-amber-200/60 shadow-sm flex flex-col items-center justify-center group hover:scale-105 transition-transform">
              <img
                src="/shaankari-logo.png"
                alt="Shaankari Creations Logo"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
            <span className="text-xs font-serif font-bold text-amber-900 mt-3 uppercase tracking-wider">
              Shaankari Creations
            </span>
          </div>

          {/* CENTER COLUMN: MAIN CONTENT & BUTTONS */}
          <div className="lg:col-span-6 text-center space-y-6 order-1 lg:order-2">
            
            {/* Shaankari Creations & By Pradeep Nadig Sub-heading */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200/90 border border-amber-300 text-amber-950 text-xs sm:text-sm font-bold uppercase tracking-widest backdrop-blur-xs shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Shaankari Creations</span>
              </div>
              <p className="text-sm sm:text-base font-serif italic font-bold text-amber-900 tracking-wide mt-1">
                by Pradeep Nadig
              </p>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-amber-950 tracking-tight leading-tight">
              {heroTitle}
            </h1>

            <p className="text-base sm:text-xl text-amber-900/90 font-light max-w-2xl mx-auto leading-relaxed">
              {heroSubtitle}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-700/20 transition-all text-base sm:text-lg group"
              >
                <span>Explore Offerings</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/workshops"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-amber-50 border border-amber-300 text-amber-950 font-bold rounded-xl shadow-xs transition-all text-base sm:text-lg"
              >
                <span>View Workshops</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: MR. PRADEEP NADIG PHOTO SLOT */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center text-center order-3">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-white/40 backdrop-blur-md p-2 border border-amber-200/60 shadow-sm flex flex-col items-center justify-center group hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/pradeep-nadig.jpg"
                alt="Shri Pradeep Nadig"
                className="w-full h-full object-cover rounded-2xl filter drop-shadow-md"
              />
            </div>
            <span className="text-xs font-serif font-bold text-amber-900 mt-3 uppercase tracking-wider">
              Shri Pradeep Nadig
            </span>
          </div>

        </div>
      </section>

      {/* 2. HORIZONTAL NAVIGATION BUTTONS BAR */}
      <section className="bg-amber-100/70 border-b border-amber-200/80 py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {navButtons.map((btn) => {
              const IconComp = btn.icon;
              return (
                <Link
                  key={btn.name}
                  href={btn.href}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-amber-950 transition-all text-center group shadow-xs hover:border-amber-400 hover:scale-105"
                >
                  <IconComp className="w-5 h-5 text-amber-700 group-hover:text-amber-800 mb-1.5 transition-transform" />
                  <span className="font-bold text-xs sm:text-sm tracking-tight">{btn.name}</span>
                  <span className="text-[10px] text-amber-800/70 font-normal hidden sm:inline">{btn.count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ABOUT MR. PRADEEP SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 flex items-center justify-center h-[480px]">
                <img
                  src="/pradeep-nadig.jpg"
                  alt="Veda Brahma Shri Pradeep Nadig"
                  className="w-full h-full object-cover filter drop-shadow-xl"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-amber-100 flex items-center gap-4 hidden sm:flex">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
                  <Award className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 font-serif">25+ Years</div>
                  <div className="text-xs text-slate-500 font-medium">Vedic Wisdom &amp; Experience</div>
                </div>
              </div>
            </div>

            {/* Content Box */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                <span>About Shri Pradeep</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">
                Dedicated to Vedic Authenticity &amp; Spiritual Guidance
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Veda Brahma Shri Pradeep Nadig is an esteemed Vedic scholar, master practitioner of traditional homas and sacred rituals, and renowned Vedic astrologer with over two decades of dedicated practice.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Authentic Vedic Rituals</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Strict adherence to Shastras and classical procedures.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Vedic Astrology Guidance</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Personalized horoscope reading &amp; effective remedies.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Chant Mastery Workshops</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Teaching proper Swara intonation and Sukta meanings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Dedicated Classes</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Hybrid and offline learning options for devotees.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 font-semibold text-amber-800 hover:text-amber-900 text-base group"
                >
                  <span>Explore all services &amp; consultations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED OFFERINGS PREVIEW */}
      {featuredOfferings.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <span className="text-amber-700 font-semibold text-xs uppercase tracking-wider">
                  Featured Offerings
                </span>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
                  Sacred Services &amp; Consultations
                </h2>
              </div>
              <Link
                href="/services"
                className="text-amber-800 font-semibold text-sm hover:underline inline-flex items-center gap-1"
              >
                View all offerings &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredOfferings.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-full uppercase">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-3">{item.short_description}</p>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={item.type === "Service" ? `/services/${item.slug}` : `/consultations/${item.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-xl transition-colors"
                    >
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
