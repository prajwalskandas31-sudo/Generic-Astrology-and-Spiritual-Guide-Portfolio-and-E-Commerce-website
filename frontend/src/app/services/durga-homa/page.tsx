import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Durga Homa | Veda Brahma Shri Pradeep Nadig",
  description: "Invoke Goddess Durga for protection, courage, success, and removal of negative energies.",
};

export default async function DurgaHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("durga-homa");
  } catch (_) {}

  const fallbackOffering = {
    id: 5,
    type: "Service" as const,
    title: "Durga Homa",
    slug: "durga-homa",
    short_description: "Invoke Goddess Durga for protection, courage, success, and removal of negative energies.",
    full_description: "Durga Homa is performed to invoke the divine blessings of Goddess Durga for protection, courage, success, and the removal of negative energies and obstacles.",
    images: ["https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200"],
    display_order: 5,
    status: "Published",
    seo_title: "Durga Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Invoke Goddess Durga's blessings for protection, courage, and spiritual strength.",
    faq: [
      { question: "When is Durga Homa recommended?", answer: "During Navaratri, before major life events, or whenever spiritual protection is sought." },
      { question: "Duration?", answer: "Approximately 2.5 to 3 hours." }
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
