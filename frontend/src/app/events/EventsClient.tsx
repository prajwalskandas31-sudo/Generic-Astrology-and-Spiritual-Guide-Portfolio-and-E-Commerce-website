"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LiveEvent } from "@/types";
import { getLiveEvents } from "@/lib/api-client";
import LiveEventRegistrationModal from "@/components/LiveEventRegistrationModal";
import EnquiryModal from "@/components/EnquiryModal";
import {
  Radio,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  CheckCircle2,
  Search,
  Building2,
  Flower2,
  ArrowRight,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

export interface EventsClientProps {
  initialEvents: LiveEvent[];
}

export default function EventsClient({ initialEvents }: EventsClientProps) {
  const [events, setEvents] = useState<LiveEvent[]>(initialEvents);
  const [activeTab, setActiveTab] = useState<"live" | "management">("management");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEventModal, setActiveEventModal] = useState<LiveEvent | null>(null);
  const [activeEnquiryModal, setActiveEnquiryModal] = useState<{
    isOpen: boolean;
    serviceName: string;
  }>({ isOpen: false, serviceName: "" });

  useEffect(() => {
    getLiveEvents()
      .then((data) => {
        if (data && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {});
  }, []);

  const liveStreamEvents = events.filter(
    (e) => !e.category || e.category === "Live Stream" || e.category.toLowerCase().includes("stream")
  );

  const eventManagementItems = events.filter(
    (e) => e.category === "Event Management" || e.category?.toLowerCase().includes("management")
  );

  const currentList = activeTab === "live" ? liveStreamEvents : eventManagementItems;

  const filteredEvents = currentList.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.short_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-amber-700" />
            <span>Shaankari Event Management &amp; Sacred Rituals</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Event Management &amp; Sacred Samskaras
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Veda Brahma Shri Pradeep Nadig and team provide complete end-to-end event management for authentic Vedic ceremonies (Marriage, Upanayana, Griha Pravesha, Seemantha) as well as live streaming broadcasts for sacred Mahahomas.
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab("management")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === "management"
                  ? "bg-amber-700 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Flower2 className="w-4 h-4" />
              <span>Event Management &amp; Samskaras ({eventManagementItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === "live"
                  ? "bg-amber-700 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Live Streaming Events ({liveStreamEvents.length})</span>
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search ceremonies or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 shadow-xs"
            />
          </div>
        </div>

        {/* Section Notice Banner */}
        {activeTab === "management" ? (
          <div className="p-4 sm:p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif font-bold text-amber-950 text-sm sm:text-base">
                  Authentic In-Person Vedic Event Management
                </h3>
                <p className="text-amber-900/80 text-xs sm:text-sm">
                  We provide experienced Ghanapathi purohits, complete puja samagri, Yajnashala construction, Mandap mandala, and sacred chanting according to your family Veda Shakha.
                </p>
              </div>
            </div>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Direct Event Call</span>
            </a>
          </div>
        ) : (
          <div className="p-4 sm:p-6 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Radio className="w-6 h-6 text-sky-700 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <h3 className="font-serif font-bold text-sky-950 text-sm sm:text-base">
                  Sacred Live Streaming &amp; Remote Sankalpa Broadcasts
                </h3>
                <p className="text-sky-900/80 text-xs sm:text-sm">
                  Participate remotely in all-night Mahashivaratri, Sharad Navratri Chandi Homas, and solar eclipse rituals from anywhere around the globe.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Grid Display */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-slate-500 font-medium text-sm">
              No events found matching your search term "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              Clear Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event) => {
              const isPaid = event.has_payment !== false && event.price > 0;
              const isManagement = event.category === "Event Management";

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider">
                        {isManagement ? (
                          <>
                            <Flower2 className="w-3.5 h-3.5 text-amber-700" />
                            <span>Samskara Event</span>
                          </>
                        ) : (
                          <>
                            <Radio className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                            <span>{event.status}</span>
                          </>
                        )}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {event.venue_type}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                        {event.title}
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {event.short_description}
                      </p>
                    </div>

                    {/* Schedule / Venue info */}
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
                          <span>Purohit Panel: {event.pandits_count} Vedic Ghanapathis</span>
                        </div>
                      )}
                    </div>

                    {/* Agenda Highlights */}
                    {event.agenda && event.agenda.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          Key Ritual Highlights
                        </span>
                        <div className="space-y-1.5 text-xs text-slate-700">
                          {event.agenda.slice(0, 3).map((item, idx) => (
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

                  {/* Actions */}
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href={`/live-events/${event.slug}`}
                      className="w-full sm:w-1/2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View Full Vidhi</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </Link>

                    {isManagement ? (
                      <button
                        onClick={() =>
                          setActiveEnquiryModal({
                            isOpen: true,
                            serviceName: `Event Management: ${event.title}`,
                          })
                        }
                        className="w-full sm:w-1/2 py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs shadow-md transition-colors text-center flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Enquire Event Booking</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveEventModal(event)}
                        className="w-full sm:w-1/2 py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs shadow-md transition-colors text-center flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isPaid ? `Register Pass • ₹${event.price.toLocaleString("en-IN")}` : "Register Free Pass"}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {activeEventModal && (
        <LiveEventRegistrationModal
          isOpen={!!activeEventModal}
          onClose={() => setActiveEventModal(null)}
          event={activeEventModal}
        />
      )}

      {activeEnquiryModal.isOpen && (
        <EnquiryModal
          isOpen={activeEnquiryModal.isOpen}
          onClose={() => setActiveEnquiryModal({ isOpen: false, serviceName: "" })}
          defaultType="Service"
          defaultCategory={activeEnquiryModal.serviceName}
        />
      )}
    </div>
  );
}
