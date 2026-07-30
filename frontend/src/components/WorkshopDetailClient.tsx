"use client";

import { useState } from "react";
import { Workshop, WorkshopBatch } from "@/types";
import WorkshopRegistrationModal from "./WorkshopRegistrationModal";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export interface WorkshopDetailClientProps {
  workshop: Workshop;
}

export default function WorkshopDetailClient({ workshop }: WorkshopDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState<number | undefined>(
    workshop.batches.length === 1 ? workshop.batches[0].id : undefined
  );

  const totalRemaining = workshop.batches.reduce((sum, b) => sum + b.remaining_seats, 0);
  const isFull = totalRemaining <= 0 || workshop.status !== "Published";

  return (
    <div className="space-y-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/workshops"
          className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Workshops</span>
        </Link>
        <span
          className={`px-3.5 py-1 text-xs font-bold rounded-full ${
            isFull ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
          }`}
        >
          {isFull ? "Full / Closed" : `${totalRemaining} Seats Remaining`}
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 space-y-8">
          {workshop.cover_image && (
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
              <img
                src={workshop.cover_image}
                alt={workshop.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              {workshop.title}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              {workshop.description}
            </p>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-amber-50/70 rounded-2xl border border-amber-100">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-medium">Dates &amp; Duration</span>
                <p className="text-sm font-bold text-slate-900">{workshop.start_date} to {workshop.end_date}</p>
                <p className="text-xs text-slate-600">{workshop.duration}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-medium">Venue &amp; Location</span>
                <p className="text-sm font-bold text-slate-900">{workshop.venue}</p>
                <p className="text-xs text-slate-600 line-clamp-1">{workshop.address}</p>
                {workshop.google_maps_link && (
                  <a
                    href={workshop.google_maps_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:underline mt-0.5"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Batches Selection */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-xl font-serif font-bold text-slate-900">
              Available Batches
            </h3>
            {workshop.batches.length === 0 ? (
              <p className="text-xs text-slate-500">No batches configured.</p>
            ) : (
              <div className="space-y-3">
                {workshop.batches.map((b) => {
                  const bFull = b.remaining_seats <= 0 || b.status !== "Active";
                  const isSelected = selectedBatchId === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => !bFull && setSelectedBatchId(b.id)}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                        bFull
                          ? "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed"
                          : isSelected
                          ? "bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 cursor-pointer"
                          : "bg-white border-slate-200 hover:border-amber-300 cursor-pointer"
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{b.batch_name}</h4>
                        <p className="text-xs text-slate-500">Timing: {b.start_time} - {b.end_time}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                            bFull
                              ? "bg-red-100 text-red-700"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {bFull ? "Batch Full" : `${b.remaining_seats} seats left`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Registration Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-100 space-y-6">
            <div className="text-center pb-4 border-b border-slate-100 space-y-1">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Registration Fee
              </span>
              <div className="text-4xl font-serif font-bold text-amber-900">
                ₹{workshop.price}
              </div>
              <p className="text-xs text-slate-500">Per Participant (Inclusive of all materials)</p>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span>Registration Deadline:</span>
                <strong className="text-slate-900">{workshop.registration_deadline || "Open"}</strong>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span>Confirmation:</span>
                <strong className="text-emerald-600">Instant WhatsApp &amp; Calendar Invite</strong>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isFull}
              className="w-full py-4 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold rounded-xl text-base transition-colors shadow-lg flex items-center justify-center gap-2 group"
            >
              <CreditCard className="w-5 h-5" />
              <span>{isFull ? "Registration Closed" : "Register Now"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Workshop Registration Modal */}
      <WorkshopRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workshop={workshop}
        selectedBatchId={selectedBatchId}
      />
    </div>
  );
}
