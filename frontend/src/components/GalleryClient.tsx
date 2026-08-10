"use client";

import { useState } from "react";
import { GalleryItem } from "@/types";
import { X, Play, ZoomIn } from "lucide-react";

export interface GalleryClientProps {
  items: GalleryItem[];
}

export default function GalleryClient({ items }: GalleryClientProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Fallback demo items if backend gallery empty
  const displayItems =
    items.length > 0
      ? items
      : [
          {
            id: 1,
            title: "Ganapathi Homa Sacred Fire",
            description: "Authentic homa performed with sacred oblations.",
            media_url: "/images/services/ganapathi-homa.jpg",
            media_type: "Image" as const,
            category: "Rituals",
            display_order: 1,
            created_at: "",
            updated_at: "",
          },
          {
            id: 2,
            title: "Vedic Chant Mastery Session",
            description: "Participants practicing Swara intonation.",
            media_url: "/images/services/sundarakanda-parayana-pooja.jpg",
            media_type: "Image" as const,
            category: "Workshops",
            display_order: 2,
            created_at: "",
            updated_at: "",
          },
          {
            id: 3,
            title: "Astrology Consultation Room",
            description: "Personal birth chart study.",
            media_url: "/images/services/vedic-astrology-consultation.jpg",
            media_type: "Image" as const,
            category: "Consultations",
            display_order: 3,
            created_at: "",
            updated_at: "",
          },
        ];

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl cursor-pointer bg-slate-200 border border-slate-200 aspect-4/3 transition-all transform hover:-translate-y-1"
          >
            <img
              src={item.media_url}
              alt={item.title || "Gallery image"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                {item.category || "Media"}
              </span>
              <h3 className="font-serif font-bold text-base mt-0.5">{item.title}</h3>
              {item.description && (
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.description}</p>
              )}
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-900/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
              {item.media_type === "Video" ? <Play className="w-4 h-4 ml-0.5" /> : <ZoomIn className="w-4 h-4" />}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-900/90 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-amber-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.media_url}
                alt={selectedItem.title || "Gallery preview"}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-6 text-white space-y-2">
              <span className="text-xs font-semibold uppercase text-amber-800">
                {selectedItem.category}
              </span>
              <h3 className="text-xl font-serif font-bold">{selectedItem.title}</h3>
              {selectedItem.description && (
                <p className="text-sm text-slate-300">{selectedItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
