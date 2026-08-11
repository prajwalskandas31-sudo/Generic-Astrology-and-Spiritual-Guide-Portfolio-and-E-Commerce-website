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
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export interface LiveEventsClientProps {
  initialEvents: LiveEvent[];
}

export default function LiveEventsClient({ initialEvents }: LiveEventsClientProps) {
  const [events] = useState<LiveEvent[]>(initialEvents);
  const [activeEventModal, setActiveEventModal] = useState<LiveEvent | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <Radio className="w-4 h-4 text-amber-700 animate-pulse" />
            <span>Sacred Broadcasts &amp; Online Yajnams</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Live Spiritual Events &amp; Sankalpa
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Join grand Vedic homas, Mahashivaratri night vigils, and eclipse shanti rituals live from anywhere in the world. Register your name, Gothra, and Nakshatra for direct ritual inclusion.
          </p>
        </div>

        {/* Live Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="p-6 sm:p-8 space-y-6">
                {/* Status & Venue Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider">
                    <Radio className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                    {event.status}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {event.venue_type}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {event.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {event.short_description}
                  </p>
                </div>

                {/* Event Schedule Box */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    <span>{event.event_date}</span>
                    <span className="text-amber-700 font-normal">| {event.event_time}</span>
                  </div>
                  {event.venue_address && (
                    <div className="flex items-start gap-2 text-xs text-slate-700">
                      <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{event.venue_address}</span>
                    </div>
                  )}
                  {event.pandits_count && (
                    <div className="flex items-center gap-2 text-xs text-amber-900 font-medium pt-1">
                      <Users className="w-4 h-4 text-amber-700" />
                      <span>Led by Shri Pradeep Nadig &amp; {event.pandits_count} Vedic Scholars</span>
                    </div>
                  )}
                </div>

                {/* Agenda Preview */}
                {event.agenda && event.agenda.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Ritual Agenda
                    </span>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      {event.agenda.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-900">{item.time}: </strong>
                            <span>{item.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href={`/live-events/${event.slug}`}
                  className="w-full sm:w-1/2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs text-center transition-colors"
                >
                  View Details &amp; Stream Info
                </Link>
                <button
                  onClick={() => setActiveEventModal(event)}
                  className="w-full sm:w-1/2 py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs shadow-md transition-colors text-center flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Register Sankalpa Pass</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeEventModal && (
        <LiveEventRegistrationModal
          isOpen={!!activeEventModal}
          onClose={() => setActiveEventModal(null)}
          event={activeEventModal}
        />
      )}
    </div>
  );
}
