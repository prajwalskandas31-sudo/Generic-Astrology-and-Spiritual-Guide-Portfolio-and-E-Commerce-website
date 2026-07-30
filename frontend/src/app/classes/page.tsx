import PublicLayout from "@/components/PublicLayout";
import { getClasses, getSettings } from "@/lib/api-client";
import ClassesClient from "@/components/ClassesClient";
import { ClassItem } from "@/types";

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
      <section className="bg-gradient-to-b from-amber-950 via-slate-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-900/40">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            Vedic Education
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-50">
            Available Vedic Classes
          </h1>
          <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
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
