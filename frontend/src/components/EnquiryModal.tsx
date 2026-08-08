"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { submitEnquiry, getOfferings, getClasses } from "@/lib/api-client";
import { FALLBACK_OFFERINGS, FALLBACK_CLASSES } from "@/lib/fallback-data";
import { Offering, ClassItem } from "@/types";

const enquirySchema = z.object({
  enquiry_type: z.enum(["Service", "Pooja", "Consultation", "Class Enquiry", "General Enquiry"]),
  name: z.string().min(2, "Full Name is required (min 2 characters)"),
  mobile: z.string().min(10, "Valid 10-digit mobile number is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  city: z.string().min(2, "City is required"),
  category: z.string().min(1, "Category selection is required"),
  additional_notes: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: "Service" | "Pooja" | "Consultation" | "Class Enquiry" | "General Enquiry";
  defaultCategory?: string;
  categoryOptions?: string[];
}

export default function EnquiryModal({
  isOpen,
  onClose,
  defaultType = "Service",
  defaultCategory = "",
  categoryOptions: customCategoryOptions,
}: EnquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedRequestId, setSubmittedRequestId] = useState<string>("");

  const [offerings, setOfferings] = useState<Offering[]>(FALLBACK_OFFERINGS);
  const [classesList, setClassesList] = useState<ClassItem[]>(FALLBACK_CLASSES);

  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    async function loadData() {
      try {
        const [offs, cls] = await Promise.all([
          getOfferings().catch(() => FALLBACK_OFFERINGS),
          getClasses().catch(() => FALLBACK_CLASSES),
        ]);
        if (isMounted) {
          if (offs && offs.length > 0) setOfferings(offs);
          if (cls && cls.length > 0) setClassesList(cls);
        }
      } catch (_) {}
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      enquiry_type: defaultType,
      category: defaultCategory || "",
      name: "",
      mobile: "",
      email: "",
      city: "",
      additional_notes: "",
    },
  });

  const selectedType = watch("enquiry_type", defaultType);

  // Compute category options dynamically based on enquiry_type
  const dynamicCategoryOptions = useMemo(() => {
    if (customCategoryOptions && customCategoryOptions.length > 0) {
      return customCategoryOptions;
    }

    let list: string[] = [];
    if (selectedType === "Service") {
      list = offerings.filter((o) => o.type === "Service").map((o) => o.title);
    } else if (selectedType === "Pooja") {
      list = offerings.filter((o) => o.type === "Pooja").map((o) => o.title);
    } else if (selectedType === "Consultation") {
      list = offerings.filter((o) => o.type === "Consultation").map((o) => o.title);
    } else if (selectedType === "Class Enquiry") {
      list = classesList.map((c) => c.name);
    } else {
      list = ["General Guidance & Enquiry"];
    }

    // Ensure fallback items if empty
    if (list.length === 0) {
      if (selectedType === "Service") list = ["Mahaganapathi Homa", "Navagraha Homa"];
      else if (selectedType === "Pooja") list = ["Sri Satyanarayana Vratha & Pooja"];
      else if (selectedType === "Consultation") list = ["Vedic Astrology Consultation"];
      else if (selectedType === "Class Enquiry") list = ["Daily Sandhyavandana & Mantras"];
      else list = ["General Guidance & Enquiry"];
    }

    // Append Other option
    return [...list, "Other / Custom Request"];
  }, [selectedType, offerings, classesList, customCategoryOptions]);

  // Keep category value in sync when options change or default is passed
  useEffect(() => {
    if (!isOpen) return;
    if (defaultCategory && dynamicCategoryOptions.includes(defaultCategory)) {
      setValue("category", defaultCategory);
    } else if (dynamicCategoryOptions.length > 0) {
      const currentCat = watch("category");
      if (!dynamicCategoryOptions.includes(currentCat)) {
        setValue("category", dynamicCategoryOptions[0]);
      }
    }
  }, [isOpen, selectedType, defaultCategory, dynamicCategoryOptions, setValue, watch]);

  if (!isOpen) return null;

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const res = await submitEnquiry({
        enquiry_type: data.enquiry_type,
        name: data.name,
        mobile: data.mobile,
        email: data.email || undefined,
        city: data.city,
        category: data.category,
        additional_notes: data.additional_notes || undefined,
      });
      if (res && res.request_id) {
        setSubmittedRequestId(res.request_id);
      }
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-100 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900">Enquiry Received!</h3>
            {submittedRequestId && (
              <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-mono font-bold text-xs rounded-lg">
                Request ID: {submittedRequestId}
              </div>
            )}
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
              Thank you! Your request has been submitted. Shri Pradeep or his team will connect with you shortly on WhatsApp.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-xl text-sm transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-full uppercase">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Submit Request</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Send an Enquiry
              </h2>
              <p className="text-xs text-slate-500">
                Fill in your details below. All fields are validated and secured.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
              {/* Type Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Enquiry Type *
                </label>
                <select
                  {...register("enquiry_type")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                >
                  <option value="Service">Service / Homa Request</option>
                  <option value="Pooja">Sacred Pooja Request</option>
                  <option value="Consultation">Astrology Consultation</option>
                  <option value="Class Enquiry">Vedic Class Enquiry</option>
                  <option value="General Enquiry">General Guidance &amp; Enquiry</option>
                </select>
                {errors.enquiry_type && (
                  <p className="text-xs text-red-600 mt-1">{errors.enquiry_type.message}</p>
                )}
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Category / Specific Service *
                </label>
                <select
                  {...register("category")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white font-medium text-slate-800"
                >
                  {dynamicCategoryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-xs text-red-600 mt-1">{errors.category.message}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  {...register("name")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Mobile Number & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    {...register("mobile")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  {errors.mobile && (
                    <p className="text-xs text-red-600 mt-1">{errors.mobile.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru"
                  {...register("city")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                {errors.city && (
                  <p className="text-xs text-red-600 mt-1">{errors.city.message}</p>
                )}
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention preferred dates, specific requirements, or details..."
                  {...register("additional_notes")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
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

