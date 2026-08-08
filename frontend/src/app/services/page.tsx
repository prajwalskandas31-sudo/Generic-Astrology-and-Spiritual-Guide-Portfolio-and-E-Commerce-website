import PublicLayout from "@/components/PublicLayout";
import { getOfferings, getSettings } from "@/lib/api-client";
import ServicesClient from "@/components/ServicesClient";
import { Offering } from "@/types";

export const revalidate = 60;

export default async function ServicesConsultationsPage() {
  let settings: Record<string, any> = {};
  let offerings: Offering[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offerings = await getOfferings();
  } catch (_) {}

  const services = offerings.filter((o) => o.type === "Service");
  const poojas = offerings.filter((o) => o.type === "Pooja");
  const consultations = offerings.filter((o) => o.type === "Consultation");

  return (
    <PublicLayout settings={settings}>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 border-b border-amber-200/80 py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-200/80">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-200/80 border border-amber-400/50 text-amber-900 text-xs font-semibold uppercase tracking-widest">
            Vedic Rituals, Poojas &amp; Astrological Guidance
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-950">
            Services, Poojas &amp; Consultations
          </h1>
          <p className="text-amber-900/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Explore authentic Vedic homas, sacred fire rituals, holy poojas, and personalized astrological guidance by Veda Brahma Shri Pradeep Nadig.
          </p>
        </div>
      </section>

      {/* EXPANDABLE CATEGORY SECTIONS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100 min-h-[70vh]">
        <ServicesClient services={services} poojas={poojas} consultations={consultations} />
      </section>
    </PublicLayout>
  );
}
