"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Finish loading animation whenever route changes
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-amber-100 overflow-hidden pointer-events-none">
      <div className="h-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 w-full animate-[progress_1.5s_infinite_linear] origin-left" />
    </div>
  );
}
