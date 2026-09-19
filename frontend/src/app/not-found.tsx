import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import { Sparkles, Home, Search, BookOpen, Calendar, HelpCircle, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Veda Brahma Shri Pradeep Nadig",
  description: "The requested page could not be found. Explore our authentic Vedic services, consultations, workshops, and spiritual blogs.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-2xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-amber-200/80 shadow-xl shadow-amber-900/5">
          {/* Badge & Icon */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>404 — Page Not Found</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-slate-900 tracking-tight">
              Looking for Divine Guidance?
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
              The page or resource you are seeking may have moved or no longer exists. Explore our core services and offerings below.
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
            <Link
              href="/services"
              className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/60 transition-all group"
            >
              <div className="p-2.5 bg-amber-900 text-amber-100 rounded-xl group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm font-serif group-hover:text-amber-950">
                  Pooja &amp; Homa Services
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Ganapathi, Navagraha, Vastu &amp; Mrityunjaya Homas
                </div>
              </div>
            </Link>

            <Link
              href="/consultations"
              className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/60 transition-all group"
            >
              <div className="p-2.5 bg-amber-900 text-amber-100 rounded-xl group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm font-serif group-hover:text-amber-950">
                  Astrology Consultations
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Kundali reading, Prashna &amp; birth chart analysis
                </div>
              </div>
            </Link>

            <Link
              href="/workshops"
              className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/60 transition-all group"
            >
              <div className="p-2.5 bg-amber-900 text-amber-100 rounded-xl group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm font-serif group-hover:text-amber-950">
                  Chanting Workshops
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Sanskrit Swara &amp; sacred Sukta learning
                </div>
              </div>
            </Link>

            <Link
              href="/blogs"
              className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/60 transition-all group"
            >
              <div className="p-2.5 bg-amber-900 text-amber-100 rounded-xl group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm font-serif group-hover:text-amber-950">
                  Spiritual Blogs &amp; Guides
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Vedic Vidhi explanations &amp; ritual details
                </div>
              </div>
            </Link>
          </div>

          {/* Home Button */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-900 hover:bg-amber-950 text-amber-100 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-sm transition-all border border-slate-300"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
