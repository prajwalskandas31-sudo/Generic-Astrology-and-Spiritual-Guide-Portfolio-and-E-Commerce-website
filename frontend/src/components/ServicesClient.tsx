"use client";

import { useState } from "react";
import Link from "next/link";
import { Offering } from "@/types";
import { ChevronDown, ChevronUp, BookOpen, Sparkles, ArrowRight, Flame } from "lucide-react";

export interface ServicesClientProps {
  services: Offering[];
  consultations: Offering[];
}

export default function ServicesClient({ services, consultations }: ServicesClientProps) {
  // Category accordion state
  const [isHomasOpen, setIsHomasOpen] = useState(true);
  const [isConsultationsOpen, setIsConsultationsOpen] = useState(true);

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* 1. HOMAS & SACRED FIRE RITUALS SECTION */}
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-md overflow-hidden transition-all">
        {/* Accordion Heading Bar */}
        <button
          onClick={() => setIsHomasOpen(!isHomasOpen)}
          className="w-full p-6 sm:p-8 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 border-b border-amber-200/80 flex items-center justify-between gap-4 text-left transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-amber-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-900/90 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  Sacred Anusthana
                </span>
                <span className="text-xs text-slate-600 font-mono">({services.length} Rituals)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950 mt-1">
                Vedic Homas &amp; Sacred Fire Rituals
              </h2>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-200/80 border border-amber-400/20 flex items-center justify-center text-amber-200 group-hover:bg-amber-500/20 transition-colors shrink-0">
            {isHomasOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {/* Expandable Grid */}
        {isHomasOpen && (
          <div className="p-6 sm:p-8 bg-slate-50 border-t border-amber-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 hover:shadow-lg hover:border-amber-400 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {item.images && item.images.length > 0 && (
                      <div className="h-44 rounded-xl overflow-hidden bg-slate-100 relative">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                        Vedic Homa
                      </span>
                      <h3 className="text-lg font-serif font-bold text-slate-900 mt-2 group-hover:text-amber-800 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs mt-2 leading-relaxed line-clamp-3">
                        {item.short_description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">Guide: Shri Pradeep Nadig</span>
                    <Link
                      href={`/services/${item.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. ASTROLOGY CONSULTATIONS SECTION */}
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-md overflow-hidden transition-all">
        {/* Accordion Heading Bar */}
        <button
          onClick={() => setIsConsultationsOpen(!isConsultationsOpen)}
          className="w-full p-6 sm:p-8 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 border-b border-amber-200/80 flex items-center justify-between gap-4 text-left transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-amber-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-900/90 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  Horoscope &amp; Jyotish
                </span>
                <span className="text-xs text-slate-600 font-mono">({consultations.length} Consultations)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950 mt-1">
                Astrology Consultations
              </h2>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-200/80 border border-amber-400/20 flex items-center justify-center text-amber-200 group-hover:bg-amber-500/20 transition-colors shrink-0">
            {isConsultationsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {/* Expandable Grid */}
        {isConsultationsOpen && (
          <div className="p-6 sm:p-8 bg-slate-50 border-t border-amber-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultations.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 hover:shadow-lg hover:border-amber-400 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {item.images && item.images.length > 0 && (
                      <div className="h-48 rounded-xl overflow-hidden bg-slate-100 relative">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                        Astrological Guidance
                      </span>
                      <h3 className="text-lg font-serif font-bold text-slate-900 mt-2 group-hover:text-amber-800 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs mt-2 leading-relaxed line-clamp-3">
                        {item.short_description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">1-on-1 Session</span>
                    <Link
                      href={`/consultations/${item.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
