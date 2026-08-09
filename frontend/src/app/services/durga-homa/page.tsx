import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Durga Homa in Bangalore for Protection & Courage | Pradeep Nadig",
  description:
    "Invoke Goddess Durga for divine protection, courage, success, and removing negative energies in Bengaluru. Authentic Navaratri & Chandi Durga Vidhi by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Durga Homa",
    "Durga Homa Bangalore",
    "Book Durga Homa Online",
    "Navaratri Durga Pooja Bengaluru",
    "Pradeep Nadig Divine Rituals",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/durga-homa",
  },
  openGraph: {
    title: "Book Durga Homa in Bangalore for Protection & Courage | Pradeep Nadig",
    description:
      "Invoke Goddess Durga's divine blessings for protection, courage, and spiritual strength by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/services/durga-homa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Durga Homa",
      serviceType: "Vedic Homa Ritual",
      description:
        "Perform Durga Homa to invoke the divine blessings of Goddess Durga for protection, courage, success, and the removal of negative energies and obstacles.",
      url: "https://pradeepnadig.in/services/durga-homa",
      provider: {
        "@type": "Person",
        name: "Pradeep Nadig",
        jobTitle: "Vedic Scholar & Spiritual Guide",
        url: "https://pradeepnadig.in",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Bengaluru, Karnataka, India",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "When is Durga Homa recommended?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "During Navaratri, Tuesdays, Fridays, Rahu Kala times, or before major life challenges when seeking divine mother's protection.",
          },
        },
        {
          "@type": "Question",
          name: "How long does Durga Homa take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Approximately 2.5 to 3 hours, including Durga Suktam chanting, kumkuma archana, and fire oblations.",
          },
        },
      ],
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          <OfferingDetailClient offering={offering || fallbackOffering} />
        </div>
      </section>
    </PublicLayout>
  );
}
