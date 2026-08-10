import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Sundarakanda Parayana & Pooja in Bangalore | Pradeep Nadig",
  description:
    "Sacred chanting of Ramayana's Sundarakanda chapter for courage, victory, and Lord Hanuman's protection. Authentic Vedic ritual performed by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Sundarakanda Parayana & Pooja",
    "Sundarakanda Parayana & Pooja Bangalore",
    "Book Sundarakanda Parayana & Pooja Online",
    "Pradeep Nadig Pooja Services",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/sundarakanda-parayana-pooja",
  },
  openGraph: {
    title: "Book Sundarakanda Parayana & Pooja in Bangalore | Pradeep Nadig",
    description: "Sacred chanting of Ramayana's Sundarakanda chapter for courage, victory, and Lord Hanuman's protection.",
    url: "https://pradeepnadig.in/services/sundarakanda-parayana-pooja",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Sundarakanda Parayana & Pooja",
      serviceType: "Vedic Parayana Ritual",
      description: "Sundarakanda Parayana & Pooja invokes Lord Hanuman and Sri Rama to grant immense courage, mental fortitude, resolution of complex legal or personal problems, and protection from unseen negative influences.",
      url: "https://pradeepnadig.in/services/sundarakanda-parayana-pooja",
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
            "name": "What are the benefits?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Promotes inner strength, removes fear, bestows victory in legal and personal challenges, and grants Lord Hanuman's grace."
            }
      }
],
    },
  ],
};

export default async function SundarakandaParayanaPoojaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("sundarakanda-parayana-pooja");
  } catch (_) {}

  const fallbackOffering = {
    id: 100,
    type: "Pooja" as const,
    title: "Sundarakanda Parayana & Pooja",
    slug: "sundarakanda-parayana-pooja",
    short_description: "Sacred chanting of Ramayana's Sundarakanda chapter for courage, victory, and Lord Hanuman's protection.",
    full_description: "Sundarakanda Parayana & Pooja invokes Lord Hanuman and Sri Rama to grant immense courage, mental fortitude, resolution of complex legal or personal problems, and protection from unseen negative influences.",
    images: ["/images/services/sundarakanda-parayana-pooja.jpg"],
    display_order: 1,
    status: "Published",
    seo_title: "Sundarakanda Parayana & Pooja | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Sacred chanting of Ramayana's Sundarakanda chapter for courage, victory, and Lord Hanuman's protection.",
    who_benefits: "Those facing daunting challenges, court cases, fear, depression, or seeking high mental confidence.",
    where_performed: "Home altars, community halls, or temple mandaps.",
    when_performed: "Tuesdays, Saturdays, Hanuman Jayanti, or during critical life junctures.",
    who_should_attend: "Family members, devotees of Lord Hanuman, and individuals seeking victory over adversity.",
    vidhi_details: "Hanuman Chalisa & Sundarakanda Sarga Chanting, Vadapav/Betel Leaf Mala Arpan, Sindoor Archana, Deeparadhana, and Sundarakanda Phala Shruti recitations.",
    faq: [
      {
            "question": "What are the benefits?",
            "answer": "Promotes inner strength, removes fear, bestows victory in legal and personal challenges, and grants Lord Hanuman's grace."
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
