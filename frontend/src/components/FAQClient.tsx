"use client";

import { useState } from "react";
import { FAQItem } from "@/types";
import { Search, ChevronDown, Filter } from "lucide-react";

export interface FAQClientProps {
  faqList: FAQItem[];
}

const CATEGORIES = [
  "All",
  "Pooja & Homa",
  "Astrology & Consultations",
  "Live Events & Sankalpa",
  "Classes & Workshops",
  "Booking & Logistics",
];

export default function FAQClient({ faqList }: FAQClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = faqList.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      !item.category ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === "Pooja & Homa" && (item.category.includes("Pooja") || item.category.includes("Homa") || item.question.toLowerCase().includes("homa") || item.question.toLowerCase().includes("pooja"))) ||
      (selectedCategory === "Astrology & Consultations" && (item.category.includes("Astrology") || item.category.includes("Consultation") || item.question.toLowerCase().includes("astrology") || item.question.toLowerCase().includes("horoscope") || item.question.toLowerCase().includes("kundali"))) ||
      (selectedCategory === "Live Events & Sankalpa" && (item.category.includes("Event") || item.category.includes("Sankalpa") || item.question.toLowerCase().includes("event") || item.question.toLowerCase().includes("live"))) ||
      (selectedCategory === "Classes & Workshops" && (item.category.includes("Class") || item.category.includes("Workshop") || item.question.toLowerCase().includes("class") || item.question.toLowerCase().includes("workshop") || item.question.toLowerCase().includes("chant"))) ||
      (selectedCategory === "Booking & Logistics" && (item.category.includes("Booking") || item.category.includes("General") || item.question.toLowerCase().includes("book") || item.question.toLowerCase().includes("venue") || item.question.toLowerCase().includes("fee")));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. homa, astrology, fees, grahan, zoom)..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto pt-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-800 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-amber-50 hover:text-amber-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion List */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
          No questions matched your search criteria. Try a different keyword or category.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id || idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-amber-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-serif font-bold text-slate-900 text-base sm:text-lg hover:text-amber-800 transition-colors"
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
                    <p className="whitespace-pre-line">{item.answer}</p>
                    {item.category && (
                      <span className="inline-block mt-3 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    )}
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
