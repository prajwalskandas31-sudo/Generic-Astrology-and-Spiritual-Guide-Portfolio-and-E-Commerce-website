import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Authentic Aghorastra Homa in Bangalore | Pradeep Nadig",
  description:
    "Perform sacred Aghorastra Homa for powerful spiritual protection, removing negative energies, and inner peace. Traditional Vedic vidhi & samagri by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Aghorastra Homa",
    "Aghorastra Homa Bangalore",
    "Shiva Homa Purohit",
    "Protection Homa Bengaluru",
    "Vedic Rituals Pradeep Nadig",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/aghorastra-homa",
  },
  openGraph: {
    title: "Book Authentic Aghorastra Homa in Bangalore | Pradeep Nadig",
    description:
      "Sacred Shiva ritual performed for powerful spiritual protection and negative energy removal by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/services/aghorastra-homa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Aghorastra Homa",
      serviceType: "Vedic Homa Ritual",
      description:
        "A sacred Shiva ritual performed for powerful spiritual protection, removal of severe negative energies, unseen obstacles, and strengthening divine grace.",
      url: "https://pradeepnadig.in/services/aghorastra-homa",
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
          name: "Who should perform Aghorastra Homa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Recommended for those seeking powerful spiritual protection, relief from persistent negative energies, and peace of mind.",
          },
        },
        {
          "@type": "Question",
          name: "What is the duration of Aghorastra Homa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Approximately 3 to 4 hours, conducted with authentic Shiva mantra chanting and sacred fire offerings.",
          },
        },
      ],
    },
  ],
};

export default async function AghorastraHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("aghorastra-homa");
  } catch (_) {}

  const fallbackOffering = {
    who_benefits: "Sacred Shiva ritual for ultimate spiritual protection, destroying evil eye (Drishti), severe negativity, and spiritual blockages.",
    where_performed: "Conducted at home prayer spaces, sacred outdoor mandaps, or temple altars.",
    when_performed: "Mantra Siddhi Tithis, Pradosham, Masa Shivaratri, or when experiencing extreme negative disturbances.",
    who_should_attend: "Sankalpa Karta and family members seeking spiritual shielding.",
    vidhi_details: "Aghora Shiva Avahana, Aghorastra Mantra 1008 Japa & Homa, Mustard & Black Sesame oblations, Bhasma Prokshana, and Protective Shiva Raksha.",
    
    id: 8,
    type: "Service" as const,
    title: "Aghorastra Homa",
    slug: "aghorastra-homa",
    short_description: "A sacred Shiva ritual performed for powerful spiritual protection and removal of negativity.",
    full_description: "Aghorastra Homa is a sacred Shiva ritual performed for powerful spiritual protection, removal of severe negative energies, unseen obstacles, and to strengthen divine grace.",
    images: ["/images/services/aghorastra-homa.jpg"],
    display_order: 8,
    status: "Published",
    seo_title: "Aghorastra Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Sacred Shiva ritual for ultimate spiritual protection and energy purification.",
    faq: [
      { question: "Who should perform Aghorastra Homa?", answer: "Recommended for those seeking powerful spiritual protection and relief from persistent negativity." },
      { question: "Duration?", answer: "Approximately 3 to 4 hours." }
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
