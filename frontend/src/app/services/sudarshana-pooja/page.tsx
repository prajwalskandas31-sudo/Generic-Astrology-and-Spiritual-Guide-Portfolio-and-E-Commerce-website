import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Sri Sudarshana Pooja in Bangalore | Pradeep Nadig",
  description:
    "Dedicated to Lord Sudarshana (Vishnu's Chakra) for protection against enemies, ill-health, and evil influences. Authentic Vedic ritual performed by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Sri Sudarshana Pooja",
    "Sri Sudarshana Pooja Bangalore",
    "Book Sri Sudarshana Pooja Online",
    "Pradeep Nadig Pooja Services",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/sudarshana-pooja",
  },
  openGraph: {
    title: "Book Sri Sudarshana Pooja in Bangalore | Pradeep Nadig",
    description: "Dedicated to Lord Sudarshana (Vishnu's Chakra) for protection against enemies, ill-health, and evil influences.",
    url: "https://pradeepnadig.in/services/sudarshana-pooja",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Sri Sudarshana Pooja",
      serviceType: "Vedic Protection Pooja",
      description: "Sri Sudarshana Pooja invokes Lord Sudarshana (the divine discus of Lord Vishnu) to eliminate negative vibrations, black eye (Drishti dosha), health ailments, and grant immediate divine protection.",
      url: "https://pradeepnadig.in/services/sudarshana-pooja",
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
            "name": "Duration?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Approximately 2 to 2.5 hours."
            }
      }
],
    },
  ],
};

export default async function SudarshanaPoojaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("sudarshana-pooja");
  } catch (_) {}

  const fallbackOffering = {
    id: 100,
    type: "Pooja" as const,
    title: "Sri Sudarshana Pooja",
    slug: "sudarshana-pooja",
    short_description: "Dedicated to Lord Sudarshana (Vishnu's Chakra) for protection against enemies, ill-health, and evil influences.",
    full_description: "Sri Sudarshana Pooja invokes Lord Sudarshana (the divine discus of Lord Vishnu) to eliminate negative vibrations, black eye (Drishti dosha), health ailments, and grant immediate divine protection.",
    images: ["/images/services/sudarshana-homa.jpg"],
    display_order: 1,
    status: "Published",
    seo_title: "Sri Sudarshana Pooja | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Dedicated to Lord Sudarshana (Vishnu's Chakra) for protection against enemies, ill-health, and evil influences.",
    who_benefits: "Individuals suffering from unexplained fear, evil eye, negative competition, or persistent illness.",
    where_performed: "At home, office premises, or temple sanctums.",
    when_performed: "Wednesdays, Saturdays, Ekadashi, or during planetary affliction periods.",
    who_should_attend: "Key family heads, business owners, and affected individuals.",
    vidhi_details: "Sudarshana Yantra Pooja, Sudarshana Ashtottara Archana, Chakra Abhishekam, Shatru Samhara Sankalpa, and Raksha Sutra Bandhana.",
    faq: [
      {
            "question": "Duration?",
            "answer": "Approximately 2 to 2.5 hours."
      }
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
