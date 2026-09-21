"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LiveEvent } from "@/types";
import LiveEventRegistrationModal from "@/components/LiveEventRegistrationModal";
import EnquiryModal from "@/components/EnquiryModal";
import ReviewSubmissionModal from "@/components/ReviewSubmissionModal";
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
  ChevronDown,
  MessageSquare,
  Flower2,
  ShieldCheck,
  PhoneCall,
  Star,
  Package,
} from "lucide-react";

import { getLiveEventBySlug } from "@/lib/api-client";

export interface LiveEventDetailClientProps {
  event: LiveEvent;
}

export default function LiveEventDetailClient({ event: initialEvent }: LiveEventDetailClientProps) {
  const [event, setEvent] = useState<LiveEvent>(initialEvent);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    getLiveEventBySlug(initialEvent.slug).then(setEvent).catch(() => {});
  }, [initialEvent.slug]);

  const isPaid = event.has_payment !== false && event.price > 0;
  const isManagement = event.category === "Event Management";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Breadcrumb & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events &amp; Samskaras</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full uppercase tracking-wider">
              {event.category || "Vedic Event"}
            </span>
            <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-medium rounded-full">
              {event.venue_type}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
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
                  Guided by Veda Brahma Shri Pradeep Nadig
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
                {event.title}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {event.full_description || event.short_description}
              </p>

              {/* Key Quick Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Event Date</span>
                    <strong className="text-slate-900 font-semibold">{event.event_date}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Timings</span>
                    <strong className="text-slate-900 font-semibold">{event.event_time}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Purohit Panel</span>
                    <strong className="text-slate-900 font-semibold">
                      {event.pandits_count ? `${event.pandits_count} Vedic Ghanapathis` : "Shri Pradeep Nadig"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Hero Actions Box */}
            <div className="lg:col-span-4 bg-gradient-to-br from-amber-50 to-amber-100/60 p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-xs space-y-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                  Reserve &amp; Schedule
                </span>
                <h3 className="font-serif font-bold text-amber-950 text-xl">
                  {isManagement ? "Enquire Event Booking" : "Register Event Pass"}
                </h3>
                <p className="text-xs text-amber-900/80">
                  {isManagement
                    ? "Get customized date calculation, priest panel, and samagri setup for your family."
                    : "Access HD Live Broadcast & remote Mahasankalpa registration."}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="w-full py-3.5 px-5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Enquire Event Booking</span>
                </button>

                {!isManagement && (
                  <button
                    onClick={() => setIsPassModalOpen(true)}
                    className="w-full py-3 px-4 bg-white hover:bg-amber-50 border border-amber-300 text-amber-950 font-bold rounded-2xl text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Radio className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                    <span>{isPaid ? `Register Pass • ₹${event.price.toLocaleString("en-IN")}` : "Register Free Stream Pass"}</span>
                  </button>
                )}

                {event.stream_url && (
                  <a
                    href={event.stream_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-white/80 hover:bg-white text-slate-800 font-semibold rounded-2xl text-xs border border-amber-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Watch HD Live Broadcast</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Vidhi Procedure, Guidance Cards, Samagri, Agenda, FAQs */}
          <div className="lg:col-span-8 space-y-10">
            {/* 4-Card Guidance Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Who Does It Benefit */}
              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/70 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Who Does It Benefit?</span>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {event.who_benefits ||
                    "Provides divine spiritual protection, peace of mind, obstacle removal, family harmony, and holistic well-being."}
                </p>
              </div>

              {/* 2. Who Should Get It Done / Attend */}
              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/70 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-700" />
                  <span>Who Should Attend / Get It Done?</span>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {event.who_should_attend ||
                    "Recommended for families, couples, parents, or devotees seeking divine grace and sacred ritual blessings."}
                </p>
              </div>

              {/* 3. When Is It Performed */}
              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/70 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-sm">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>When Is It Performed?</span>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {event.when_performed ||
                    "Conducted on auspicious Tithis, birth nakshatras, sacred Mahamuhoorthas, or designated celestial festival dates."}
                </p>
              </div>

              {/* 4. Where Is It Done */}
              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/70 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-sm">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>Where Is It Conducted?</span>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {event.where_performed ||
                    "Conducted at your personal home, Kalyana Mantapa, event venue across Bengaluru, or via HD Live Stream broadcast."}
                </p>
              </div>
            </div>

            {/* Vedic Vidhi & Ritual Procedure Highlights Box */}
            {event.vidhi_details && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                    <Flower2 className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                      Authentic Procedure
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Vedic Vidhi &amp; Ritual Execution
                    </h3>
                  </div>
                </div>

                <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line space-y-2 bg-amber-50/40 p-5 rounded-2xl border border-amber-100 font-normal">
                  {event.vidhi_details}
                </div>
              </div>
            )}

            {/* Samagri & Ritual Preparation Highlights */}
            {event.samagri_highlights && event.samagri_highlights.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                    <Package className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                      Pure &amp; Sanctified Materials
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Puja Samagri &amp; Preparation Provided
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.samagri_highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Agenda Breakdown */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Ritual Timeline</span>
                  <h2 className="text-2xl font-serif font-bold text-slate-900">
                    Event Agenda &amp; Step-by-Step Schedule
                  </h2>
                </div>

                <div className="space-y-6 border-l-2 border-amber-200 pl-4 sm:pl-6 ml-2 sm:ml-4">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="relative pl-4 space-y-1.5">
                      <div className="absolute -left-[25px] sm:-left-[33px] top-1.5 w-4 h-4 rounded-full bg-amber-700 border-4 border-white shadow-xs" />
                      <span className="text-xs font-bold text-amber-800 tracking-wider inline-block px-2.5 py-0.5 bg-amber-100 rounded-md">
                        {item.time}
                      </span>
                      <h3 className="font-serif font-bold text-slate-900 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Venue Location Address */}
            {event.venue_address && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-amber-700" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-slate-900 text-lg">Venue Location &amp; Venue Type</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{event.venue_address}</p>
                </div>
              </div>
            )}

            {/* Comprehensive FAQs Section */}
            {event.faq && event.faq.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                      Common Queries
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-6 h-6 text-amber-700" />
                      <span>Frequently Asked Questions</span>
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {event.faq.length} FAQs
                  </span>
                </div>

                <div className="space-y-3">
                  {event.faq.map((faqItem, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-slate-50/80 rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-100 transition-colors gap-4"
                        >
                          <span className="leading-snug">{faqItem.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                              isOpen ? "rotate-180 text-amber-700" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                            {faqItem.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200 space-y-6">
              <div className="space-y-2 text-center pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Book / Enquire Event
                </span>
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  {event.title}
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-500">Category:</span>
                  <span className="font-semibold text-slate-900">{event.category || "Vedic Ritual"}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-500">Mode:</span>
                  <span className="font-semibold text-slate-900">{event.venue_type}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-500">Lead Scholar:</span>
                  <span className="font-semibold text-slate-900">Shri Pradeep Nadig</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-500">Response Guarantee:</span>
                  <span className="font-semibold text-emerald-600">Within 24 Hours</span>
                </div>
              </div>

              {/* Main Action CTA Button */}
              <button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-2xl text-base transition-colors shadow-lg flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Enquire Event Booking</span>
              </button>

              {!isManagement && (
                <button
                  onClick={() => setIsPassModalOpen(true)}
                  className="w-full py-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Radio className="w-4 h-4 text-amber-700 animate-pulse" />
                  <span>{isPaid ? `Register Pass • ₹${event.price.toLocaleString("en-IN")}` : "Register Free Stream Pass"}</span>
                </button>
              )}

              <a
                href="tel:+919876543210"
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-800" />
                <span>Call Directly for Urgent Event</span>
              </a>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-semibold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>Submit Review / Feedback</span>
              </button>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-amber-700 mx-auto" />
                <p className="text-[11px] text-amber-950 font-medium leading-relaxed">
                  Authentic Ghanapathi Scholars, 100% pure puja materials, &amp; tailored family Veda Sutra adherence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Pass Modal */}
      <LiveEventRegistrationModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        event={event}
      />

      {/* Enquiry Event Booking Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultType="Service"
        defaultCategory={`Event Management: ${event.title}`}
      />

      {/* Review Submission Modal */}
      <ReviewSubmissionModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        initialService={`Event Management: ${event.title}`}
      />
    </div>
  );
}

