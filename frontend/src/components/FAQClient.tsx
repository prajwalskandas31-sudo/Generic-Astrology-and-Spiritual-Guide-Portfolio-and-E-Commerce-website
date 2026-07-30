"use client";

import { useState } from "react";
import { FAQItem } from "@/types";
import { Search, ChevronDown } from "lucide-react";

export interface FAQClientProps {
  faqList: FAQItem[];
}

export default function FAQClient({ faqList }: FAQClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = faqList.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search questions (e.g. homa, astrology, fees, venue)..."
          className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
        />
      </div>

      {/* Accordion List */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
          No questions matched your search. Try a different keyword or contact us directly.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-serif font-bold text-slate-900 text-lg hover:text-amber-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 text-xs font-sans font-bold flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span>{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 font-sans">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
