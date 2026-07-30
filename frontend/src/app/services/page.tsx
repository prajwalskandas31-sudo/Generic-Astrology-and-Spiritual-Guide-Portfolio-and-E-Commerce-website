import PublicLayout from "@/components/PublicLayout";
import { getOfferings, getSettings } from "@/lib/api-client";
import Link from "next/link";
import { Sparkles, BookOpen, ArrowRight, Shield } from "lucide-react";
import { Offering } from "@/types";

export const revalidate = 60;

export default async function ServicesConsultationsPage() {
  let settings: Record<string, any> = {};
  let offerings: Offering[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offerings = await getOfferings();
  } catch (_) {}

  const services = offerings.filter((o) => o.type === "Service");
  const consultations = offerings.filter((o) => o.type === "Consultation");

  return (
    <PublicLayout settings={settings}>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-amber-950 via-slate-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-900/40">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            Vedic Rituals &amp; Guidance
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-50">
            Services &amp; Consultations
          </h1>
          <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Explore authentic Vedic homam rituals, home poojas, and personalized astrological consultations by Shri Pradeep Nadig.
          </p>
        </div>
      </section>

      {/* 2-COLUMN GRID SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* COLUMN 1: SERVICES */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-amber-200 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shadow-md">
                  <BookOpen className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900">Vedic Services &amp; Rituals</h2>
                  <p className="text-xs text-slate-500 font-medium">Sacred Homas, Poojas &amp; Anusthana</p>
                </div>
              </div>

              <div className="space-y-6">
                {services.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                    No services currently published.
                  </div>
                ) : (
                  services.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 hover:shadow-md hover:border-amber-300 transition-all space-y-4 group"
                    >
                      {item.images && item.images.length > 0 && (
                        <div className="h-48 rounded-xl overflow-hidden bg-slate-100 mb-4">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                          Vedic Ritual
                        </span>
                        <h3 className="text-xl font-serif font-bold text-slate-900 mt-1 group-hover:text-amber-800 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm mt-2 line-clamp-3">
                          {item.short_description}
                        </p>
                      </div>
                      <div className="pt-2 flex items-center justify-between">
                        <Link
                          href={`/services/${item.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs rounded-xl shadow-xs transition-colors"
                        >
                          <span>View Details &amp; Request</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* COLUMN 2: CONSULTATIONS */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-amber-200 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900">Astrology Consultations</h2>
                  <p className="text-xs text-slate-500 font-medium">Horoscope Analysis &amp; Vedic Guidance</p>
                </div>
              </div>

              <div className="space-y-6">
                {consultations.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                    No consultations currently published.
                  </div>
                ) : (
                  consultations.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 hover:shadow-md hover:border-amber-300 transition-all space-y-4 group"
                    >
                      {item.images && item.images.length > 0 && (
                        <div className="h-48 rounded-xl overflow-hidden bg-slate-100 mb-4">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                          Astrological Guidance
                        </span>
                        <h3 className="text-xl font-serif font-bold text-slate-900 mt-1 group-hover:text-amber-800 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm mt-2 line-clamp-3">
                          {item.short_description}
                        </p>
                      </div>
                      <div className="pt-2 flex items-center justify-between">
                        <Link
                          href={`/consultations/${item.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-medium text-xs rounded-xl shadow-xs transition-colors"
                        >
                          <span>View Details &amp; Request</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
