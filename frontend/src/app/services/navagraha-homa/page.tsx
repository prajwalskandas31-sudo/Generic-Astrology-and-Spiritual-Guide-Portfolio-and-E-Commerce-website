import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navagraha Homa | Veda Brahma Shri Pradeep Nadig",
  description: "Seek blessings of the nine planetary deities, reduce planetary doshas, and bring harmony and prosperity.",
};

export default async function NavagrahaHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("navagraha-homa");
  } catch (_) {}

  const fallbackOffering = {
    id: 2,
    type: "Service" as const,
    title: "Navagraha Homa",
    slug: "navagraha-homa",
    short_description: "Performed to seek the blessings of the nine planetary deities and reduce planetary doshas.",
    full_description: "Navagraha Homa is performed to seek the blessings of the nine planetary deities (Navagrahas), reduce the effects of adverse planetary positions, and bring harmony, prosperity, and overall well-being into life.",
    images: ["https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200"],
    display_order: 2,
    status: "Published",
    seo_title: "Navagraha Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Harmonize planetary influences and reduce doshas with authentic Navagraha Homa.",
    faq: [
      { question: "How long does Navagraha Homa take?", answer: "Typically 2.5 to 3.5 hours." },
      { question: "When is it recommended?", answer: "Before important life events, during difficult planetary periods (Dasha/Bhukti), or for general prosperity." }
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
