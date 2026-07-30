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
        {classesList.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-full uppercase flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{item.mode} Mode</span>
                </span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  {item.status}
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-slate-900">
                {item.name}
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
              onClick={() => handleEnquire(item.name)}
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Class Enquiry</span>
            </button>
          </div>
        ))}
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
