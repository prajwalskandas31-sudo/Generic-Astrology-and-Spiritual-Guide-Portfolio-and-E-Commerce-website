import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Lakshmi Narayana Hrudaya Homa in Bangalore | Pradeep Nadig",
  description:
    "Invoke combined blessings of Goddess Lakshmi & Lord Vishnu for wealth, marital harmony, and prosperity in Bengaluru. Authentic Vedic vidhi by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Lakshmi Narayana Hrudaya Homa",
    "Lakshmi Narayana Homa Bangalore",
    "Wealth Prosperity Homa",
    "Vishnu Lakshmi Pooja Bengaluru",
    "Pradeep Nadig Vedic Scholar",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/lakshmi-narayana-hrudaya-homa",
  },
  openGraph: {
    title: "Book Lakshmi Narayana Hrudaya Homa in Bangalore | Pradeep Nadig",
    description:
      "Invoke divine wealth, prosperity, and marital harmony with Lakshmi Narayana Hrudaya Homa by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/services/lakshmi-narayana-hrudaya-homa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Lakshmi Narayana Hrudaya Homa",
      serviceType: "Vedic Homa Ritual",
      description:
        "Performed to invoke the combined blessings of Goddess Lakshmi and Lord Narayana for wealth, prosperity, family harmony, business success, and spiritual growth.",
      url: "https://pradeepnadig.in/services/lakshmi-narayana-hrudaya-homa",
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
          name: "When is Lakshmi Narayana Hrudaya Homa recommended?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ideal for business owners, newlyweds, housewarmings, or anyone seeking financial stability and marital peace.",
          },
        },
        {
          "@type": "Question",
          name: "How long does Lakshmi Narayana Hrudaya Homa take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Typically 3 to 4 hours, involving Lakshmi Hrudaya and Narayana Hrudaya stotra parayanas and ghee oblations.",
          },
        },
      ],
    },
  ],
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
