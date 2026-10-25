"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, ExternalLink, BookmarkCheck, CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    PREFERRED_SOURCE?: Array<(preferredSource: any) => void>;
  }
}

export const PREFERRED_SOURCE_URL = "https://www.google.com/preferences/source?q=pradeepnadig.in";

/**
 * Official Google Multi-Colored 'G' Icon
 */
export function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

/**
 * Triggers Google's interactive Preferred Source flow if available,
 * otherwise falls back to opening the Google Preferences Deeplink.
 */
export function triggerPreferredSourceModal() {
  if (typeof window === "undefined") return;

  let invoked = false;
  try {
    if (window.PREFERRED_SOURCE) {
      window.PREFERRED_SOURCE.push((preferredSource: any) => {
        try {
          if (preferredSource && typeof preferredSource.addPreferredSource === "function") {
            preferredSource.init?.({ theme: "light", lang: "en" });
            preferredSource.addPreferredSource();
            invoked = true;
          }
        } catch {
          // Fall back if invocation fails
        }
      });
    }
  } catch {
    // Ignore and proceed to fallback
  }

  // If not immediately handled by in-memory script, open the Google Preferences direct tool
  if (!invoked) {
    window.open(PREFERRED_SOURCE_URL, "_blank", "noopener,noreferrer");
  }
}

interface GooglePreferredSourceButtonProps {
  theme?: "light" | "dark";
  lang?: string;
  showFallbackLink?: boolean;
  className?: string;
}

/**
 * Google Preferred Sources Button with graceful fallback and no layout overflow
 */
export function GooglePreferredSourceButton({
  theme = "light",
  className = "",
}: GooglePreferredSourceButtonProps) {
  return (
    <a
      href={PREFERRED_SOURCE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (typeof window !== "undefined" && window.PREFERRED_SOURCE && window.PREFERRED_SOURCE.length > 0) {
          e.preventDefault();
          triggerPreferredSourceModal();
        }
      }}
      className={`group inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold shadow-2xs transition-all border ${
        theme === "dark"
          ? "bg-slate-900 hover:bg-slate-800 text-white border-slate-700"
          : "bg-white hover:bg-amber-50/90 text-slate-800 border-amber-300 hover:border-amber-400"
      } ${className}`}
      title="Add pradeepnadig.in as a Preferred Source in Google Search"
    >
      <GoogleIcon className="w-4 h-4 shrink-0" />
      <span className="truncate">Add to Preferred Sources</span>
      <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 group-hover:text-amber-800 transition-colors" />
    </a>
  );
}

/**
 * Editorial Callout Banner for Blog Article Footers
 */
export function GooglePreferredSourceBanner({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Google Search Preferred Source"
      className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-amber-100/70 via-amber-50 to-orange-100/60 border border-amber-200/90 shadow-sm ${className}`}
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 rounded-full bg-amber-200/40 blur-2xl pointer-events-none" />

      <div className="relative space-y-5">
        {/* Header with Google Icon and Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-amber-200 rounded-full shadow-2xs">
            <GoogleIcon className="w-4 h-4" />
            <span className="text-xs font-bold text-amber-950 tracking-wide uppercase font-serif">
              Google Search Preferred Source
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            AI Overviews &amp; Top Stories Eligible
          </span>
        </div>

        {/* Title and Explanation */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-950 flex items-center gap-2">
            <span>Follow Pradeep Nadig on Google Search</span>
            <Sparkles className="w-4 h-4 text-amber-600 hidden sm:inline" />
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed max-w-2xl">
            Never miss authentic Vedic ritual procedures, auspicious Muhurtha timings, and profound astrological guidance. Add <strong>pradeepnadig.in</strong> as your preferred source to see our articles and answers highlighted with a &ldquo;Preferred&rdquo; badge in Google Search and AI Overviews.
          </p>
        </div>

        {/* Benefits List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700 font-medium">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Priority placement in Google Top Stories</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Highlighted &ldquo;Preferred&rdquo; badge in Google AI Mode</span>
          </div>
        </div>

        {/* Interactive Action Area */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {/* Direct Deeplink Button for 1-Click Action */}
          <a
            href={PREFERRED_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (typeof window !== "undefined" && window.PREFERRED_SOURCE && window.PREFERRED_SOURCE.length > 0) {
                e.preventDefault();
                triggerPreferredSourceModal();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-900 hover:bg-amber-950 text-amber-50 rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all border border-amber-800/80 cursor-pointer"
          >
            <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Add via Google Preferences Tool</span>
            <ExternalLink className="w-3 h-3 text-amber-300" />
          </a>

          <span className="text-[11px] text-slate-500 font-normal">
            Domain: <code>pradeepnadig.in</code>
          </span>
        </div>
      </div>
    </section>
  );
}

export default GooglePreferredSourceButton;
