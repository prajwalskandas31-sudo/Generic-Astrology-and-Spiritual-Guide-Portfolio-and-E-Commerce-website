import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aghorastra Homa | Veda Brahma Shri Pradeep Nadig",
  description: "A sacred Shiva ritual performed for powerful spiritual protection and removal of negativity.",
};

export default async function AghorastraHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("aghorastra-homa");
  } catch (_) {}

  const fallbackOffering = {
    id: 8,
    type: "Service" as const,
    title: "Aghorastra Homa",
    slug: "aghorastra-homa",
    short_description: "A sacred Shiva ritual performed for powerful spiritual protection and removal of negativity.",
    full_description: "Aghorastra Homa is a sacred Shiva ritual performed for powerful spiritual protection, removal of severe negative energies, unseen obstacles, and to strengthen divine grace.",
    images: ["https://images.unsplash.com/photo-1609101824149-4dbcf69b0c0f?q=80&w=1200"],
    display_order: 8,
    status: "Published",
    seo_title: "Aghorastra Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Sacred Shiva ritual for ultimate spiritual protection and energy purification.",
    faq: [
      { question: "Who should perform Aghorastra Homa?", answer: "Recommended for those seeking powerful spiritual protection and relief from persistent negativity." },
      { question: "Duration?", answer: "Approximately 3 to 4 hours." }
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
