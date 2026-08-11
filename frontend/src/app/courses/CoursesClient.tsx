"use client";

import { useState } from "react";
import Link from "next/link";
import { Course } from "@/types";
import CourseRegistrationModal from "@/components/CourseRegistrationModal";
import {
  BookOpenCheck,
  Clock,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";

export interface CoursesClientProps {
  initialCourses: Course[];
}

export default function CoursesClient({ initialCourses }: CoursesClientProps) {
  const [courses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const filteredCourses = courses.filter((c) => {
    const matchesQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;
    return matchesQuery && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <BookOpenCheck className="w-4 h-4 text-amber-700" />
            <span>Vedic Knowledge &amp; Certification</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Vedic Courses &amp; Learning Programs
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Deepen your understanding of Vedic Astrology, Mantra Chanting, Prashna Horary principles, and Vastu Shastra under the traditional guidance of Shri Pradeep Nadig.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by topic, title..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900"
            />
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {["All", "Beginner", "Intermediate", "All Levels"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedLevel === level
                    ? "bg-amber-700 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-900"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="p-6 sm:p-8 space-y-6">
                {/* Header Tags */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider">
                    {course.level}
                  </span>
                  <span className="text-xs text-amber-800 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {course.short_description}
                  </p>
                </div>

                {/* Modules Summary */}
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                    <Layers className="w-4 h-4 text-amber-700" />
                    <span>Key Syllabus Highlights ({course.syllabus_modules.length} Modules)</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {course.syllabus_modules.slice(0, 3).map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{m.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block">Instructor</span>
                    <strong className="text-slate-800 font-medium">{course.instructor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Learning Mode</span>
                    <strong className="text-slate-800 font-medium">{course.mode}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href={`/courses/${course.slug}`}
                  className="w-full sm:w-1/2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs text-center transition-colors"
                >
                  View Details &amp; Syllabus
                </Link>
                <button
                  onClick={() => setActiveCourseModal(course)}
                  className="w-full sm:w-1/2 py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs shadow-md transition-colors text-center"
                >
                  Enroll Now • ₹{course.price.toLocaleString("en-IN")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {activeCourseModal && (
        <CourseRegistrationModal
          isOpen={!!activeCourseModal}
          onClose={() => setActiveCourseModal(null)}
          course={activeCourseModal}
        />
      )}
    </div>
  );
}
