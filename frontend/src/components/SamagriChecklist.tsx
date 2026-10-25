"use client";

import { useState, useEffect } from "react";
import { RitualSamagri, SamagriItem } from "@/lib/samagri-data";
import {
  CheckSquare,
  Square,
  Printer,
  Sparkles,
  ShoppingBag,
  Flame,
  MessageSquare,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

interface SamagriChecklistProps {
  samagri: RitualSamagri;
}

export default function SamagriChecklist({ samagri }: SamagriChecklistProps) {
  const [activeTab, setActiveTab] = useState<"all" | "host" | "purohit">("all");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const storageKey = `samagri_checked_${samagri.serviceSlug}`;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (_) {}
  }, [storageKey]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
  };

  const resetChecklist = () => {
    setCheckedItems({});
    try {
      localStorage.removeItem(storageKey);
    } catch (_) {}
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const filteredItems = samagri.items.filter((item) => {
    if (activeTab === "host") return item.category === "host";
    if (activeTab === "purohit") return item.category === "purohit";
    return true;
  });

  const totalHostItems = samagri.items.filter((i) => i.category === "host").length;
  const checkedHostItems = samagri.items.filter(
    (i) => i.category === "host" && checkedItems[i.id]
  ).length;

  return (
    <div className="bg-white rounded-2xl border border-amber-200/90 shadow-md p-6 sm:p-8 space-y-6 print:border-none print:shadow-none print:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-amber-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Interactive Preparation Checklist</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Pooja Samagri Checklist
          </h2>
          <p className="text-sm font-serif text-amber-900 font-semibold italic">
            {samagri.kannadaTitle}
          </p>
          <p className="text-xs text-slate-600 max-w-2xl pt-1">
            {samagri.intro} Tick off items as you shop or keep them ready in your home.
          </p>
        </div>

        {/* Action Buttons (Print & Reset) */}
        <div className="flex items-center gap-2 shrink-0 print:hidden">
          <button
            onClick={resetChecklist}
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 text-xs flex items-center gap-1.5"
            title="Reset Checked Items"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-amber-900 hover:bg-amber-950 text-amber-100 rounded-xl text-xs font-bold shadow-sm transition-all border border-amber-700/50 flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Progress tracker for Host Items */}
      <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs print:hidden">
        <div className="flex items-center gap-2.5 text-amber-950 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Host Preparation Progress: <strong>{checkedHostItems}</strong> of{" "}
            <strong>{totalHostItems}</strong> items ready
          </span>
        </div>
        <div className="w-full sm:w-48 bg-amber-200/60 rounded-full h-2 overflow-hidden">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${totalHostItems > 0 ? (checkedHostItems / totalHostItems) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3 print:hidden">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === "all"
              ? "bg-amber-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All Items ({samagri.items.length})
        </button>
        <button
          onClick={() => setActiveTab("host")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "host"
              ? "bg-amber-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Family Keeps Ready ({totalHostItems})</span>
        </button>
        <button
          onClick={() => setActiveTab("purohit")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "purohit"
              ? "bg-amber-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Guruji Arranges ({samagri.items.length - totalHostItems})</span>
        </button>
      </div>

      {/* Samagri Table / Checklist Items */}
      <div className="divide-y divide-slate-100">
        {filteredItems.map((item) => {
          const isChecked = !!checkedItems[item.id];
          const isHost = item.category === "host";

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`py-3.5 px-3 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-4 select-none ${
                isChecked
                  ? "bg-emerald-50/50 text-slate-500"
                  : "hover:bg-amber-50/40 text-slate-900"
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  aria-label="Toggle item status"
                  className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        isChecked ? "line-through text-slate-400" : "text-slate-900"
                      }`}
                    >
                      {item.nameEn}
                    </span>
                    <span className="text-xs font-serif font-bold text-amber-900/90">
                      ({item.nameKn})
                    </span>
                  </div>

                  {item.note && (
                    <p className="text-[11px] text-slate-500 italic">
                      Note: {item.note}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0 flex flex-col items-end gap-1">
                <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                  {item.quantity}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isHost
                      ? "bg-amber-100 text-amber-900"
                      : "bg-orange-100 text-orange-900"
                  }`}
                >
                  {isHost ? "By Host" : "By Guruji"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner & Booking CTA */}
      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200/70 print:hidden">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-serif font-bold text-amber-950">
            Have Questions About This Samagri List?
          </h4>
          <p className="text-xs text-slate-600">
            Veda Brahma Shri Pradeep Nadig can customize the Samagri list based on your family traditions and venue constraints.
          </p>
        </div>

        <a
          href={`https://wa.me/919844042068?text=${encodeURIComponent(
            `Namaskara Guruji, I am preparing for ${samagri.serviceTitle} and have a query regarding the pooja samagri checklist.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask Guruji on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
