import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Astrology & Horoscope Consultation | Veda Brahma Shri Pradeep Nadig",
  description: "Personalized Jyotish horoscope readings, birth chart analysis, planetary dasha insights, and Vedic remedies with Shri Pradeep Nadig.",
};

export default async function VedicAstrologyConsultationPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("vedic-astrology-consultation");
  } catch (_) {}

  const fallbackOffering = {
    id: 2,
    type: "Consultation" as const,
    title: "Vedic Astrology Consultation",
    slug: "vedic-astrology-consultation",
    short_description: "Comprehensive birth chart analysis, planetary transit assessment, and personalized remedial guidance.",
    full_description: "Detailed 1-on-1 consultation analyzing your Janma Kundali (horoscope), Vimshottari Dasha periods, and planetary transits. Shri Pradeep Nadig offers authentic Vedic remedial recommendations for health, career, relationships, and spiritual growth.",
    images: ["https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1200"],
    display_order: 2,
    status: "Published",
    seo_title: "Vedic Astrology Consultation",
    seo_description: "Expert horoscope analysis and Vedic remedies.",
    faq: [
      { question: "What details are required?", answer: "Exact date of birth, time of birth, and place of birth are required for precise chart calculation." },
      { question: "Is online consultation available?", answer: "Yes, 1-on-1 consultations are conducted via Video Call or in-person." }
    ]
  };

  return (
    <PublicLayout settings={settings}>
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          <OfferingDetailClient offering={offering || fallbackOffering} />
        </div>
      </section>
    </PublicLayout>
  );
}
