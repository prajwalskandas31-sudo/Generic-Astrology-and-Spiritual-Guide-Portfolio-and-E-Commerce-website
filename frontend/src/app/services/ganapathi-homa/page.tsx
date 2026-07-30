import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ganapathi Homa | Veda Brahma Shri Pradeep Nadig",
  description: "Perform sacred Mahaganapathi Homa for removing obstacles, seeking divine blessings, prosperity, and peace of mind.",
};

export default async function GanapathiHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("ganapathi-homa");
  } catch (_) {}

  // Fallback data if DB is offline or starting up
  const fallbackOffering = {
    id: 1,
    type: "Service" as const,
    title: "Mahaganapathi Homa",
    slug: "ganapathi-homa",
    short_description: "Sacred fire ritual dedicated to Lord Ganesha for overcoming obstacles and invoking auspicious beginnings.",
    full_description: "Mahaganapathi Homa is performed to seek the blessings of Lord Ganesha, the lord of auspicious beginnings and remover of all impediments. This sacred Vedic fire ritual includes 108 dravya ahuti chanting authentic Atharvashirsha mantras.",
    images: ["https://images.unsplash.com/photo-1609101824149-4dbcf69b0c0f?auto=format&fit=crop&q=80&w=1200"],
    display_order: 1,
    status: "Published",
    seo_title: "Ganapathi Homa Rituals",
    seo_description: "Perform Mahaganapathi Homa for peace and obstacle removal.",
    faq: [
      { question: "What materials are required?", answer: "All sacred dravya, modaka, ghee, and samithu materials will be arranged by us." },
      { question: "Can this be conducted at home?", answer: "Yes, this homa can be performed at your residence, office, or selected venue." }
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
