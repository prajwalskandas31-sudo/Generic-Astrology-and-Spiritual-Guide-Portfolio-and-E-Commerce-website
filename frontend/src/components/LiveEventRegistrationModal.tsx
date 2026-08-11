"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LiveEvent } from "@/types";
import { registerLiveEvent, verifyPayment } from "@/lib/api-client";
import { X, CheckCircle2, Loader2, Radio, Calendar, MapPin, AlertCircle, Sparkles, CreditCard, MessageSquare } from "lucide-react";

const liveEventSchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  mobile: z.string().min(10, "Valid 10-digit mobile number required"),
  email: z.string().email("Valid email address required"),
  gothra: z.string().optional(),
  nakshatra: z.string().optional(),
  rashi: z.string().optional(),
  sankalpa_wish: z.string().optional(),
  pass_type: z.enum(["Virtual Pass", "VIP Sankalpa Pass", "In-Person Pass"]),
});

type LiveEventFormData = z.infer<typeof liveEventSchema>;

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface LiveEventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: LiveEvent;
}

export default function LiveEventRegistrationModal({
  isOpen,
  onClose,
  event,
}: LiveEventRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<LiveEventFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LiveEventFormData>({
    resolver: zodResolver(liveEventSchema),
    defaultValues: {
      pass_type: event.price === 0 ? "Virtual Pass" : "VIP Sankalpa Pass",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: LiveEventFormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSubmittedData(data);

    try {
      const isPaid = event.price > 0 && data.pass_type !== "Virtual Pass";
      const regRes = await registerLiveEvent(event.id, {
        ...data,
        amount: isPaid ? event.price : 0,
      });

      const payMode = (event as any).payment_mode || "RAZORPAY";
      const customLink = (event as any).custom_payment_link;

      if (isPaid && payMode === "CUSTOM_LINK" && customLink) {
        window.open(customLink, "_blank");
        setIsSuccess(true);
        reset();
        return;
      }

      if (isPaid && payMode === "RAZORPAY") {
        const loaded = await loadRazorpayScript();
        if (loaded && (window as any).Razorpay && (regRes as any).razorpay_order_id) {
          const options = {
            key: (regRes as any).key_id || "rzp_test_mockkey",
            amount: (regRes as any).amount || event.price * 100,
            currency: "INR",
            name: "Veda Brahma Shri Pradeep Nadig",
            description: `Sankalpa Pass - ${event.title}`,
            order_id: (regRes as any).razorpay_order_id,
            prefill: {
              name: data.name,
              email: data.email,
              contact: data.mobile,
            },
            handler: async (response: any) => {
              try {
                await verifyPayment({
                  registration_id: (regRes as any).registration_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                });
                setIsSuccess(true);
                reset();
              } catch (_) {
                setIsSuccess(true);
                reset();
              }
            },
            theme: { color: "#b45309" },
          };
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
          setIsSubmitting(false);
          return;
        }
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to register for live event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-amber-200 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-950 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-amber-200 hover:text-white hover:bg-amber-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-wider font-semibold">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Live Event Pass &amp; Sankalpa</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-amber-50 mt-1 line-clamp-1">
            {event.title}
          </h3>
          <div className="flex items-center gap-4 mt-2 text-xs text-amber-200 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {event.event_date} ({event.event_time})
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-amber-700" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-slate-900">
                Sankalpa Registered!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your Sankalpa registration for <strong className="text-slate-900">{event.title}</strong> has been received. Shri Pradeep Nadig will chant your name during the sacred ritual.
              </p>

              <div className="pt-2 space-y-2">
                <a
                  href={`https://wa.me/919844000000?text=${encodeURIComponent(
                    `Namaste Shri Pradeep Nadig Ji!\nI have registered Sankalpa for "${event.title}".\n\nName: ${submittedData?.name || 'Devotee'}\nGothra: ${submittedData?.gothra || 'N/A'}\nNakshatra: ${submittedData?.nakshatra || 'N/A'}\nRashi: ${submittedData?.rashi || 'N/A'}\nPass Type: ${submittedData?.pass_type || 'Standard'}\nWish: ${submittedData?.sankalpa_wish || 'Lokah Samastah Sukhino Bhavantu'}\n\nPlease share the live stream joining details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Sankalpa Pass Confirmation &rarr;</span>
                </a>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
                >
                  Close &amp; Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900"
                />
                {errors.name && (
                  <p className="text-red-500 text-[11px] mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register("mobile")}
                    placeholder="+91 98440 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.mobile.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Gothra, Nakshatra, Rashi */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  Sacred Sankalpa Details
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-0.5">
                      Gothra
                    </label>
                    <input
                      type="text"
                      {...register("gothra")}
                      placeholder="e.g. Kashyapa"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 text-xs bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-0.5">
                      Nakshatra
                    </label>
                    <input
                      type="text"
                      {...register("nakshatra")}
                      placeholder="e.g. Rohini"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 text-xs bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-0.5">
                      Rashi
                    </label>
                    <input
                      type="text"
                      {...register("rashi")}
                      placeholder="e.g. Vrishabha"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 text-xs bg-white text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Pass Type
                </label>
                <select
                  {...register("pass_type")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900 bg-white"
                >
                  <option value="Virtual Pass">Virtual Live Stream Pass (Free / Digital Access)</option>
                  <option value="VIP Sankalpa Pass">VIP Sankalpa Pass (Includes Name Chanting &amp; Prasadam Post)</option>
                  <option value="In-Person Pass">In-Person Ashram Attendance Pass</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Prayer / Sankalpa Intent
                </label>
                <textarea
                  rows={2}
                  {...register("sankalpa_wish")}
                  placeholder="Family wellbeing, health, career growth, peace..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering Sankalpa...</span>
                    </>
                  ) : event.price > 0 ? (
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4" />
                      <span>Register &amp; Pay ₹{event.price.toLocaleString("en-IN")} &rarr;</span>
                    </span>
                  ) : (
                    <span>Register Free Sankalpa Pass &rarr;</span>
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
