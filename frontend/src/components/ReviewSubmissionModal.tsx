"use client";

import { useState } from "react";
import { X, Star, Send, CheckCircle2, Loader2, HeartHandshake } from "lucide-react";
import { submitReview } from "@/lib/api-client";

export interface ReviewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  "Griha Pravesha Pooja",
  "Ganapathi Homa / Navagraha Homa",
  "Vastu Homa & Consultation",
  "Astrology & Horoscope Reading",
  "Vedic Chanting Class / Workshop",
  "Satyanarayana Pooja",
  "Naga Shanthi & Special Homa",
  "General Vedic Service & Consultation",
];

export default function ReviewSubmissionModal({
  isOpen,
  onClose,
}: ReviewSubmissionModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientLocation, setClientLocation] = useState<string>("");
  const [serviceTaken, setServiceTaken] = useState<string>(SERVICE_OPTIONS[0]);
  const [customService, setCustomService] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!reviewText.trim() || reviewText.trim().length < 10) {
      setErrorMessage("Please write a review of at least 10 characters.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const selectedService = serviceTaken === "Other" ? customService : serviceTaken;

    try {
      await submitReview({
        name: clientName.trim(),
        email: clientEmail.trim() || undefined,
        city: clientLocation.trim() || undefined,
        service_type: selectedService || undefined,
        rating,
        comment: reviewText.trim(),
      });
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setRating(5);
    setHoverRating(0);
    setClientName("");
    setClientEmail("");
    setClientLocation("");
    setServiceTaken(SERVICE_OPTIONS[0]);
    setCustomService("");
    setReviewText("");
    setIsSuccess(false);
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-amber-200/80 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white shrink-0 relative">
          <button
            onClick={resetForm}
            className="absolute top-4 right-4 text-amber-200/80 hover:text-white p-1 rounded-full hover:bg-amber-800/60 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 mb-1.5">
            <HeartHandshake className="w-5 h-5 text-amber-300" />
            <h2 className="font-serif font-bold text-xl text-amber-50">
              Share Your Experience
            </h2>
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
            Your valued feedback &amp; review help others discover authentic Vedic rituals &amp; consultations.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto grow space-y-5">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Thank You for Your Review!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your experience and words have been successfully received. Once verified by our team, your review will be displayed on our portal.
              </p>
              <button
                onClick={resetForm}
                className="mt-4 px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-sm font-semibold shadow-md transition-all"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Star Rating Picker */}
              <div className="space-y-1.5 text-center bg-amber-50/60 p-4 rounded-xl border border-amber-200/50">
                <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider">
                  Your Overall Rating
                </label>
                <div className="flex items-center justify-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-hidden"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hoverRating || rating)
                            ? "fill-amber-400 text-amber-500 drop-shadow-xs"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-semibold text-amber-900 block">
                  {rating === 5 && "⭐ Exceptional & Highly Devotional (5/5)"}
                  {rating === 4 && "⭐ Very Satisfied (4/5)"}
                  {rating === 3 && "⭐ Good Experience (3/5)"}
                  {rating === 2 && "⭐ Average (2/5)"}
                  {rating === 1 && "⭐ Needs Improvement (1/5)"}
                </span>
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden"
                />
              </div>

              {/* Service & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service / Pooja Experienced
                  </label>
                  <select
                    value={serviceTaken}
                    onChange={(e) => setServiceTaken(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden bg-white"
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                    <option value="Other">Other Custom Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Locality / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Malleswaram, Bengaluru"
                    value={clientLocation}
                    onChange={(e) => setClientLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden"
                  />
                </div>
              </div>

              {serviceTaken === "Other" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specify Service Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Special Chandi Homa"
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden"
                  />
                </div>
              )}

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 font-normal">(optional, kept confidential)</span>
                </label>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Detailed Feedback &amp; Words <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your experience with Shri Pradeep Nadig's purohit services, mantras, punctuality, and guidance..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-amber-950 text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Feedback...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Review for Moderation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
