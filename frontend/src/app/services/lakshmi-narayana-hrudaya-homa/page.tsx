import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lakshmi Narayana Hrudaya Homa | Veda Brahma Shri Pradeep Nadig",
  description: "Invoke combined blessings of Goddess Lakshmi and Lord Narayana for wealth, harmony, and abundance.",
};

export default async function LakshmiNarayanaHrudayaHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("lakshmi-narayana-hrudaya-homa");
  } catch (_) {}

  const fallbackOffering = {
    id: 11,
    type: "Service" as const,
    title: "Lakshmi Narayana Hrudaya Homa",
    slug: "lakshmi-narayana-hrudaya-homa",
    short_description: "Invoke combined blessings of Goddess Lakshmi and Lord Narayana for wealth, harmony, and abundance.",
    full_description: "Lakshmi Narayana Hrudaya Homa is performed to invoke the combined blessings of Goddess Lakshmi and Lord Narayana for wealth, prosperity, family harmony, spiritual growth, and overall abundance.",
    images: ["https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200"],
    display_order: 11,
    status: "Published",
    seo_title: "Lakshmi Narayana Hrudaya Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Attract prosperity, wealth, and family harmony with Lakshmi Narayana Hrudaya Homa.",
    faq: [
      { question: "When is Lakshmi Narayana Hrudaya Homa recommended?", answer: "Ideal for business owners, families, before new ventures, or anyone seeking prosperity and harmony." },
      { question: "Duration?", answer: "Typically 3 to 4 hours." }
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
