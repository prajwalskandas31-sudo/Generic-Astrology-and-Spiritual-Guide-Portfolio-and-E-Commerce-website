"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Course } from "@/types";
import { registerCourse } from "@/lib/api-client";
import { X, CheckCircle2, Loader2, BookOpen, Clock, AlertCircle } from "lucide-react";

const courseSchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  mobile: z.string().min(10, "Valid 10-digit mobile number required"),
  email: z.string().email("Valid email address required"),
  preferred_batch: z.string().optional(),
  additional_notes: z.string().optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

export interface CourseRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

export default function CourseRegistrationModal({
  isOpen,
  onClose,
  course,
}: CourseRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      preferred_batch: course.schedule || "Weekend Morning Batch",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await registerCourse(course.id, data);
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to complete course enrollment. Please try again.");
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
        <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-amber-200 hover:text-white hover:bg-amber-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-wider font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Course Enrollment</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-amber-50 mt-1 line-clamp-1">
            {course.title}
          </h3>
          <div className="flex items-center gap-4 mt-2 text-xs text-amber-200 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span>Fee: ₹{course.price.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-slate-900">
                Enrollment Submitted!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for enrolling in <strong className="text-slate-900">{course.title}</strong>. Shri Pradeep Nadig’s team will contact you via WhatsApp / Phone with batch joining details and study schedule.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl text-sm transition-colors"
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Batch &amp; Schedule
                </label>
                <input
                  type="text"
                  {...register("preferred_batch")}
                  placeholder="e.g., Saturday & Sunday Morning"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Notes or Questions
                </label>
                <textarea
                  rows={3}
                  {...register("additional_notes")}
                  placeholder="Any prior astrology knowledge or specific questions..."
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
                      <span>Submitting Enrollment...</span>
                    </>
                  ) : (
                    <span>Confirm Course Enrollment &rarr;</span>
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
