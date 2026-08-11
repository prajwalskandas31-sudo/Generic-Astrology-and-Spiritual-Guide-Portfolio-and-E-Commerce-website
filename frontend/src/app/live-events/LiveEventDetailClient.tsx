"use client";

import { useState } from "react";
import Link from "next/link";
import { LiveEvent } from "@/types";
import LiveEventRegistrationModal from "@/components/LiveEventRegistrationModal";
import {
  Radio,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
} from "lucide-react";

export interface LiveEventDetailClientProps {
  event: LiveEvent;
}

export default function LiveEventDetailClient({ event }: LiveEventDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Back Button */}
        <div>
          <Link
            href="/live-events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Live Events</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              {event.status}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
              {event.venue_type}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
            {event.title}
          </h1>

          <p className="text-slate-600 text-base sm:text-xl leading-relaxed font-light">
            {event.full_description || event.short_description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Event Date</span>
                <strong className="text-slate-900 font-semibold">{event.event_date}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Timings</span>
                <strong className="text-slate-900 font-semibold">{event.event_time}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Pandit Team</span>
                <strong className="text-slate-900 font-semibold">
                  {event.pandits_count ? `${event.pandits_count} Vedic Scholars` : "Shri Pradeep Nadig"}
                </strong>
              </div>
            </div>
          </div>

          {/* Stream Access Link & Action */}
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif font-bold text-amber-950 text-lg">
                Online Broadcast &amp; Sankalpa Registration
              </h4>
              <p className="text-xs text-amber-900/80">
                {event.stream_url ? "HD Live Stream accessible via YouTube/Zoom." : "Access link provided upon Sankalpa registration."}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {event.stream_url && (
                <a
                  href={event.stream_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-white hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Watch Stream</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
                </a>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Register Sankalpa Pass</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Agenda Breakdown */}
        {event.agenda && event.agenda.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Timeline</span>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Event Agenda &amp; Prahara Ritual Schedule
              </h2>
            </div>

            <div className="space-y-4 border-l-2 border-amber-200 pl-4 ml-2">
              {event.agenda.map((item, idx) => (
                <div key={idx} className="relative pl-4 space-y-1">
                  <div className="absolute -left-[25px] top-1.5 w-4 h-4 rounded-full bg-amber-700 border-4 border-white shadow-xs" />
                  <span className="text-xs font-bold text-amber-800 tracking-wider">
                    {item.time}
                  </span>
                  <h3 className="font-serif font-bold text-slate-900 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Venue Information */}
        {event.venue_address && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-amber-700" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-slate-900 text-lg">In-Person Venue Location</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{event.venue_address}</p>
            </div>
          </div>
        )}

        {/* FAQs */}
        {event.faq && event.faq.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-amber-700" />
              <span>Event FAQs</span>
            </h2>

            <div className="space-y-4">
              {event.faq.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <h4 className="font-semibold text-slate-900 text-base">{item.question}</h4>
                  <p className="text-slate-600 text-sm">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <LiveEventRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
      />
    </div>
  );
}
