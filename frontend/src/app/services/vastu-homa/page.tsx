import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vastu Homa | Veda Brahma Shri Pradeep Nadig",
  description: "Purify homes, offices, and commercial spaces, remove Vastu doshas, and invite positive energy.",
};

export default async function VastuHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("vastu-homa");
  } catch (_) {}

  const fallbackOffering = {
    id: 7,
    type: "Service" as const,
    title: "Vastu Homa",
    slug: "vastu-homa",
    short_description: "Purify homes, offices, and commercial spaces, remove Vastu doshas, and invite positive energy.",
    full_description: "Vastu Homa is performed to purify homes, offices, and commercial spaces, remove Vastu doshas, and invite peace, prosperity, and positive energy into the property.",
    images: ["https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200"],
    display_order: 7,
    status: "Published",
    seo_title: "Vastu Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Purify property and remove Vastu doshas with authentic Vastu Homa rituals.",
    faq: [
      { question: "When should Vastu Homa be performed?", answer: "Before entering a new home, after renovations, or when experiencing persistent disturbances." },
      { question: "Duration?", answer: "Typically 2.5 to 3.5 hours." }
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
