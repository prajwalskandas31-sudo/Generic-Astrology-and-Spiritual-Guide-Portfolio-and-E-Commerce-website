import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mrityunjaya Homa | Veda Brahma Shri Pradeep Nadig",
  description: "Dedicated to Lord Shiva for protection from illness, accidents, and promoting long life and health.",
};

export default async function MrityunjayaHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("mrityunjaya-homa");
  } catch (_) {}

  const fallbackOffering = {
    id: 3,
    type: "Service" as const,
    title: "Mrityunjaya Homa",
    slug: "mrityunjaya-homa",
    short_description: "Dedicated to Lord Shiva for protection from illness, accidents, and promoting longevity.",
    full_description: "Mrityunjaya Homa is dedicated to Lord Shiva and is performed for protection from illness, accidents, untimely dangers, and to promote long life, good health, and inner strength.",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200"],
    display_order: 3,
    status: "Published",
    seo_title: "Mrityunjaya Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Seek Shiva's divine protection, long life, and mental strength through Mrityunjaya Homa.",
    faq: [
      { question: "How long does the Homa take?", answer: "Approximately 2.5 to 3 hours." },
      { question: "Who should perform it?", answer: "Recommended for those facing health challenges, major life obstacles, or seeking divine protection." }
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
