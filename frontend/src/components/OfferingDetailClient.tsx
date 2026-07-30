"use client";

import { useState } from "react";
import { Offering } from "@/types";
import EnquiryModal from "./EnquiryModal";
import { Sparkles, CheckCircle2, ChevronDown, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface OfferingDetailClientProps {
  offering: Offering;
}

export default function OfferingDetailClient({ offering }: OfferingDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const isService = offering.type === "Service";

  return (
    <div className="space-y-12">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Offerings</span>
        </Link>
        <span className="px-3.5 py-1 bg-amber-100 text-amber-900 font-medium text-xs rounded-full uppercase">
          {offering.type}
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Images & Overview */}
        <div className="lg:col-span-7 space-y-8">
          {offering.images && offering.images.length > 0 && (
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
              <img
                src={offering.images[0]}
                alt={offering.title}
                className="w-full h-[380px] object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              {offering.title}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              {offering.full_description || offering.short_description}
            </p>
          </div>

          {/* Benefits Section */}
          <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-100 space-y-4">
            <h3 className="text-lg font-serif font-bold text-amber-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Key Benefits &amp; Significance</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Performed in strict accordance with authentic Vedic Shastras.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Personalized Sankalpa conducted specifically in your name &amp; Gothra.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Promotes spiritual peace, obstacle removal, and positive energetic alignment.</span>
              </li>
            </ul>
          </div>

          {/* Optional FAQ Section */}
          {offering.faq && offering.faq.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {offering.faq.map((faqItem, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between font-semibold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
                      >
                        <span>{faqItem.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform ${
                            isOpen ? "rotate-180 text-amber-600" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-slate-600 text-xs leading-relaxed border-t border-slate-100 pt-3">
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

        {/* Right Column: Sticky Action Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-100 space-y-6">
            <div className="space-y-2 text-center pb-4 border-b border-slate-100">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Book / Request {offering.type}
              </span>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                {offering.title}
              </h2>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="font-medium text-slate-500">Mode:</span>
                <span className="font-semibold text-slate-900">In-Person / Online</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="font-medium text-slate-500">Guide:</span>
                <span className="font-semibold text-slate-900">Shri Pradeep Nadig</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="font-medium text-slate-500">Response Time:</span>
                <span className="font-semibold text-emerald-600">Within 24 Hours</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-base transition-colors shadow-lg flex items-center justify-center gap-2 group"
            >
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{isService ? "Request Service" : "Request Consultation"}</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              No immediate online payment required. Submitting this form sends an enquiry to Shri Pradeep.
            </p>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultType={offering.type}
        defaultCategory={offering.title}
      />
    </div>
  );
}
