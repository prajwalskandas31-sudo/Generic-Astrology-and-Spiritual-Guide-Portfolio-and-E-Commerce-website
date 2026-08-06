import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayushya Homa | Veda Brahma Shri Pradeep Nadig",
  description: "Performed to pray for a long, healthy, and prosperous life, especially on birthdays and milestones.",
};

export default async function AyushyaHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("ayushya-homa");
  } catch (_) {}

  const fallbackOffering = {
    id: 4,
    type: "Service" as const,
    title: "Ayushya Homa",
    slug: "ayushya-homa",
    short_description: "Performed to pray for a long, healthy, and prosperous life, especially on birthdays.",
    full_description: "Ayushya Homa is performed to pray for a long, healthy, and prosperous life. It is especially performed on birthdays, for young children, and during important life milestones.",
    images: ["https://images.unsplash.com/photo-1609101824149-4dbcf69b0c0f?q=80&w=1200"],
    display_order: 4,
    status: "Published",
    seo_title: "Ayushya Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Invoke blessings for health, vitality, and longevity with authentic Ayushya Homa.",
    faq: [
      { question: "When should Ayushya Homa be performed?", answer: "Commonly on birthdays, especially the first birthday and annual birthdays." },
      { question: "How long does it take?", answer: "Around 2 to 3 hours." }
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
