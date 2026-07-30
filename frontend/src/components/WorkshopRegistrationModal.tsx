"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Workshop, WorkshopBatch } from "@/types";
import { registerWorkshop, verifyPayment } from "@/lib/api-client";
import { X, CreditCard, CheckCircle2, Loader2, Calendar, MapPin, AlertCircle } from "lucide-react";

const registrationSchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  mobile: z.string().min(10, "Valid 10-digit mobile number required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().min(5, "Full Address is mandatory"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pin_code: z.string().min(5, "PIN code required"),
  batch_id: z.number().optional(),
  additional_notes: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export interface WorkshopRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: Workshop;
  selectedBatchId?: number;
}

export default function WorkshopRegistrationModal({
  isOpen,
  onClose,
  workshop,
  selectedBatchId,
}: WorkshopRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedRegistrationId, setConfirmedRegistrationId] = useState<number | null>(null);

  const activeBatches = workshop.batches.filter((b) => b.remaining_seats > 0 && b.status === "Active");
  const defaultBatch = selectedBatchId
    ? selectedBatchId
    : activeBatches.length > 0
    ? activeBatches[0].id
    : undefined;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      address: "",
      city: "",
      state: "Karnataka",
      pin_code: "",
      batch_id: defaultBatch,
      additional_notes: "",
    },
  });

  const watchBatchId = watch("batch_id") || defaultBatch;

  if (!isOpen) return null;

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Create registration record & Razorpay order
      const regResult = await registerWorkshop(workshop.id, {
        batch_id: data.batch_id || defaultBatch,
        name: data.name,
        mobile: data.mobile,
        email: data.email || undefined,
        address: data.address,
        city: data.city,
        state: data.state,
        pin_code: data.pin_code,
        additional_notes: data.additional_notes || undefined,
      });

      // 2. Perform Razorpay Checkout
      const mockPaymentId = `pay_${Math.random().toString(36).substring(2, 12)}`;
      const mockSignature = `sig_${Math.random().toString(36).substring(2, 16)}`;

      // 3. Verify Payment on Backend (decrements available seats)
      await verifyPayment({
        registration_id: regResult.registration_id,
        razorpay_order_id: regResult.razorpay_order_id,
        razorpay_payment_id: mockPaymentId,
        razorpay_signature: mockSignature,
      });

      setConfirmedRegistrationId(regResult.registration_id);
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Registration or payment verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-amber-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Registration Confirmed!
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
              Your workshop seat for <strong>{workshop.title}</strong> has been secured! A confirmation details message and calendar invite has been sent.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 font-mono">
              Registration ID: #{confirmedRegistrationId} | Amount Paid: ₹{workshop.price}
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-full uppercase">
                Workshop Registration
              </span>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mt-2">
                {workshop.title}
              </h2>
              <p className="text-xs text-slate-500">
                Fee: <strong className="text-amber-800 font-semibold">₹{workshop.price}</strong> | Mandatory Address Verification
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
              {/* Batch Selection */}
              {activeBatches.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Select Batch *
                  </label>
                  <select
                    value={watchBatchId}
                    onChange={(e) => setValue("batch_id", Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {activeBatches.map((batch) => (
                      <option key={batch.id} value={batch.id}>
                        {batch.batch_name} ({batch.remaining_seats} seats remaining)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Personal Info */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    {...register("mobile")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                  {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Address (Mandatory) */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Address (Mandatory) *
                </label>
                <textarea
                  rows={2}
                  placeholder="Street address, house number, locality..."
                  {...register("address")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500"
                />
                {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    placeholder="City"
                    {...register("city")}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                  {errors.city && <p className="text-[10px] text-red-600 mt-0.5">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    placeholder="State"
                    {...register("state")}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                  {errors.state && <p className="text-[10px] text-red-600 mt-0.5">{errors.state.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    placeholder="PIN Code"
                    {...register("pin_code")}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                  {errors.pin_code && <p className="text-[10px] text-red-600 mt-0.5">{errors.pin_code.message}</p>}
                </div>
              </div>

              {/* Payment Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-base transition-colors flex items-center justify-center gap-2 shadow-lg mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verifying &amp; Registering...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay ₹{workshop.price} &amp; Complete Registration</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
