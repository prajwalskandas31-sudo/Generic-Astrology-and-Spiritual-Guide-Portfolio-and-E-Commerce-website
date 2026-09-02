"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // 1. Finish loading animation when route (pathname/searchParams) changes
  useEffect(() => {
    if (isNavigating) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // 2. Global listener for link clicks across the site
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Filter out non-navigation or external links
      if (
        href.startsWith("#") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("whatsapp:") ||
        anchor.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Avoid triggering if clicking link to current exact URL
      try {
        const targetUrl = new URL(anchor.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search
        ) {
          return;
        }

        // Activate navigation indicator immediately
        setIsNavigating(true);
        setProgress(25);

        // Visual click feedback & double-click prevention
        anchor.classList.add("pointer-events-none", "opacity-80");

        // Inject subtle spinner if not present
        if (!anchor.querySelector(".nav-click-spinner")) {
          const spinner = document.createElement("span");
          spinner.className =
            "nav-click-spinner inline-block ml-1.5 animate-spin border-2 border-amber-600 border-t-transparent rounded-full w-3.5 h-3.5 align-middle";
          anchor.appendChild(spinner);
        }

        // Safety timeout to reset element state after 5 seconds if navigation stalls
        setTimeout(() => {
          anchor.classList.remove("pointer-events-none", "opacity-80");
          anchor.querySelector(".nav-click-spinner")?.remove();
        }, 5000);
      } catch (_) {}
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, []);

  // 3. Smooth progress incrementing while waiting for page load
  useEffect(() => {
    if (!isNavigating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;
        if (prev < 40) return prev + 12;
        if (prev < 70) return prev + 6;
        return prev + 2;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isNavigating]);

  // Clean up residual click spinner styles on route completion
  useEffect(() => {
    document.querySelectorAll(".nav-click-spinner").forEach((el) => el.remove());
    document.querySelectorAll(".pointer-events-none").forEach((el) => {
      if (el.tagName === "A") {
        el.classList.remove("pointer-events-none", "opacity-80");
      }
    });
  }, [pathname, searchParams]);

  if (!isNavigating && progress === 0) return null;

  return (
    <>
      {/* Sleek Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[99999] h-1 bg-amber-100/40 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-150 ease-out shadow-[0_0_12px_#d97706]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Top-Right Loading Badge */}
      <div className="fixed top-20 right-4 sm:right-6 z-[99999] pointer-events-none animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="bg-amber-950/90 text-amber-100 backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl border border-amber-500/30 flex items-center gap-2.5 text-xs font-semibold tracking-wide">
          <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
          <span>Opening page...</span>
        </div>
      </div>
    </>
  );
}
