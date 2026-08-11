"use client";

import { useState } from "react";
import Link from "next/link";
import { Course } from "@/types";
import CourseRegistrationModal from "@/components/CourseRegistrationModal";
import {
  BookOpenCheck,
  Clock,
  GraduationCap,
  Calendar,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  ChevronDown,
  Award,
  BookOpen,
} from "lucide-react";

export interface CourseDetailClientProps {
  course: Course;
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  const toggleModule = (idx: number) => {
    setOpenModuleIndex(openModuleIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider">
              {course.level} Level
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
              {course.mode}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
            {course.title}
          </h1>

          <p className="text-slate-600 text-base sm:text-xl leading-relaxed font-light">
            {course.full_description || course.short_description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Duration</span>
                <strong className="text-slate-900 font-semibold">{course.duration}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Schedule</span>
                <strong className="text-slate-900 font-semibold">{course.schedule || "Weekend Live"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Instructor</span>
                <strong className="text-slate-900 font-semibold">{course.instructor}</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">Total Fee</span>
              <span className="text-3xl font-serif font-bold text-amber-900">
                ₹{course.price.toLocaleString("en-IN")}
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-amber-700/20 transition-all text-base"
            >
              Enroll in Course Now &rarr;
            </button>
          </div>
        </div>

        {/* Course Syllabus Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Curriculum</span>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Detailed Syllabus &amp; Modules
            </h2>
          </div>

          <div className="space-y-4">
            {course.syllabus_modules.map((module, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleModule(idx)}
                  className="w-full p-5 bg-slate-50 hover:bg-amber-50/60 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-200 text-amber-950 flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-slate-900 text-base">
                        {module.title}
                      </h3>
                      {module.duration && (
                        <span className="text-xs text-slate-500 font-medium">{module.duration}</span>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      openModuleIndex === idx ? "rotate-180 text-amber-800" : ""
                    }`}
                  />
                </button>

                {openModuleIndex === idx && (
                  <div className="p-5 bg-white border-t border-slate-200/80 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Topics Covered in this Module:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                      {module.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisites & Instructor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <span>Prerequisites &amp; Learning Needs</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {course.prerequisites || "No prior prerequisites needed. Open to all dedicated seekers."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-700" />
              <span>Mastery Certification</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Upon successful completion of live sessions and final chart decoding assignment, students will receive an official course completion certificate issued by Veda Brahma Shri Pradeep Nadig.
            </p>
          </div>
        </div>

        {/* FAQs */}
        {course.faq && course.faq.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-amber-700" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-4">
              {course.faq.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <h4 className="font-semibold text-slate-900 text-base">{item.question}</h4>
                  <p className="text-slate-600 text-sm">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <CourseRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
      />
    </div>
  );
}
