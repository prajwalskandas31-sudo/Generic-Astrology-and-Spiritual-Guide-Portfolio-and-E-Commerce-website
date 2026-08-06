import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naga Shanthi | Veda Brahma Shri Pradeep Nadig",
  description: "Seek blessings of Naga Devatas, reduce Sarpa Dosha, and support family harmony and fertility.",
};

export default async function NagaShanthiPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("naga-shanthi");
  } catch (_) {}

  const fallbackOffering = {
    id: 9,
    type: "Service" as const,
    title: "Naga Shanthi",
    slug: "naga-shanthi",
    short_description: "Seek blessings of Naga Devatas, reduce Sarpa Dosha, and support family harmony.",
    full_description: "Naga Shanthi is performed to seek the blessings of the Naga Devatas, reduce Sarpa Dosha, and remove obstacles related to marriage, childbirth, family well-being, and ancestral karma.",
    images: ["https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1200"],
    display_order: 9,
    status: "Published",
    seo_title: "Naga Shanthi | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Perform Naga Shanthi to mitigate Sarpa Dosha and invite peace and fertility.",
    faq: [
      { question: "When is Naga Shanthi recommended?", answer: "When advised through horoscope analysis or for relief from Sarpa Dosha." },
      { question: "Duration?", answer: "Usually 2.5 to 3 hours." }
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
