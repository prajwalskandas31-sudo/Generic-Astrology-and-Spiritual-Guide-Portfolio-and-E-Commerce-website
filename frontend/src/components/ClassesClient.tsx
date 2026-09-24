"use client";

import { useState } from "react";
import { ClassItem } from "@/types";
import EnquiryModal from "./EnquiryModal";
import { GraduationCap, Clock, Users, Globe, MessageSquare } from "lucide-react";

export interface ClassesClientProps {
  classesList: ClassItem[];
}

export default function ClassesClient({ classesList }: ClassesClientProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnquire = (className: string) => {
    setSelectedClass(className);
    setIsModalOpen(true);
  };

  if (classesList.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 max-w-lg mx-auto">
        No active classes currently listed. Please check back soon or send a general enquiry.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {classesList.map((item) => {
          const rawImg = (item as any).cover_image || (item as any).images?.[0];
          const classImg = Array.isArray(rawImg)
            ? rawImg[0]
            : (rawImg || (item.name?.toLowerCase().includes("rudram")
                ? "/images/services/rudrabhishekam-pooja.jpg"
                : "/images/courses/sacred-vedic-chanting-mastery.jpg"));

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all flex flex-col justify-between group"
            >
              {/* Top Banner Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={classImg}
                  alt={item.name || item.title || "Vedic Class"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-amber-950 text-xs font-semibold rounded-full uppercase flex items-center gap-1.5 shadow-sm">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                    <span>{item.mode} Mode</span>
                  </span>
                  <span className="text-xs font-medium text-emerald-700 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {item.name || item.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Duration: <strong>{item.duration || "N/A"}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600" />
                      <span>Suitable For: <strong>{item.suitable_for || "All"}</strong></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleEnquire(item.name || item.title || "")}
                  className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 mt-4"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Class Enquiry</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultType="Class Enquiry"
        defaultCategory={selectedClass || "General Class Enquiry"}
      />
    </div>
  );
}
