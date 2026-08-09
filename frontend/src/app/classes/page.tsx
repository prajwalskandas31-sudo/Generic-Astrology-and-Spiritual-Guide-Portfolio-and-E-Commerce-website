import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import { getClasses, getSettings } from "@/lib/api-client";
import ClassesClient from "@/components/ClassesClient";
import { ClassItem } from "@/types";

export const metadata: Metadata = {
  title: "Vedic Chanting & Astrology Classes | Pradeep Nadig",
  description:
    "Learn authentic Vedic chanting, Suktam recitation, and Vedic Astrology through structured online and offline classes taught by Veda Brahma Shri Pradeep Nadig.",
  alternates: {
    canonical: "https://pradeepnadig.in/classes",
  },
  openGraph: {
    title: "Vedic Chanting & Astrology Classes | Pradeep Nadig",
    description:
      "Structured classes on Veda Chanting, Strotras, and Astrology by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/classes",
  },
};

export const revalidate = 60;

export default async function ClassesPage() {
  let settings: Record<string, any> = {};
  let classesList: ClassItem[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    classesList = await getClasses();
  } catch (_) {}

  return (
    <PublicLayout settings={settings}>
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 border-b border-amber-200/80 py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-200/80">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-200/80 border border-amber-400/50 text-amber-900 text-xs font-semibold uppercase tracking-widest">
            Vedic Education
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-950">
            Available Vedic Classes
          </h1>
          <p className="text-amber-900/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Learn classical Sandhyavandana, foundational mantras, and advanced Vedic chanting directly under the guidance of Shri Pradeep Nadig.
          </p>
        </div>
      </section>

      {/* Classes Grid Client */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <ClassesClient classesList={classesList} />
        </div>
      </section>
    </PublicLayout>
  );
}
