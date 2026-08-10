import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Maha Mrityunjaya Homa in Bangalore for Health & Protection | Pradeep Nadig",
  description:
    "Seek Lord Shiva's divine protection from illness, accidents, and untimely dangers with Maha Mrityunjaya Homa in Bengaluru. Authentic Vedic vidhi & samagri by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Maha Mrityunjaya Homa",
    "Mrityunjaya Homa Bangalore",
    "Shiva Health Homa",
    "Protection Pooja Bengaluru",
    "Pradeep Nadig Vedic Rituals",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/mrityunjaya-homa",
  },
  openGraph: {
    title: "Book Maha Mrityunjaya Homa in Bangalore | Pradeep Nadig",
    description:
      "Seek Lord Shiva's divine protection, long life, and health with Maha Mrityunjaya Homa by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/services/mrityunjaya-homa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Maha Mrityunjaya Homa",
      serviceType: "Vedic Homa Ritual",
      description:
        "Dedicated to Lord Shiva for protection from illness, accidents, untimely dangers, and promoting long life, robust health, and spiritual resilience.",
      url: "https://pradeepnadig.in/services/mrityunjaya-homa",
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
          name: "Who should perform Maha Mrityunjaya Homa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Recommended for anyone facing severe health challenges, chronic illnesses, critical surgeries, or seeking divine protection from accidents.",
          },
        },
        {
          "@type": "Question",
          name: "How long does Maha Mrityunjaya Homa take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Approximately 2.5 to 3.5 hours, including Mahamrityunjaya mantra chanting, durva grass offerings, and sacred ghee ahuti.",
          },
        },
      ],
    },
  ],
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
    images: ["/images/services/mrityunjaya-homa.jpg"],
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
