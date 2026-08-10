import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Vedic Astrology & Kundali Consultation in Bangalore | Pradeep Nadig",
  description:
    "Personalized Jyotish horoscope readings, Kundali matching, career/marriage insights, and authentic Vedic remedies in Bengaluru by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Vedic Astrology Consultation",
    "Best Astrologer Bangalore",
    "Kundali Matching Bengaluru",
    "Horoscope Reading Pradeep Nadig",
    "Jyotish Consultation Online",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/consultations/vedic-astrology-consultation",
  },
  openGraph: {
    title: "Book Vedic Astrology & Kundali Consultation in Bangalore | Pradeep Nadig",
    description:
      "Detailed 1-on-1 horoscope analysis, Dasha predictions, and authentic Vedic remedies by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/consultations/vedic-astrology-consultation",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Vedic Astrology Consultation",
      serviceType: "Astrological Consultation",
      description:
        "Detailed 1-on-1 consultation analyzing Janma Kundali (birth chart), Vimshottari Dasha periods, and planetary transits with authentic remedial recommendations for health, career, and marriage.",
      url: "https://pradeepnadig.in/consultations/vedic-astrology-consultation",
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
          name: "What details are required for a Vedic Astrology Consultation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Exact Date of Birth, Time of Birth, and Place of Birth are required for accurate Janma Kundali calculations.",
          },
        },
        {
          "@type": "Question",
          name: "Is online video consultation available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, 1-on-1 private consultations are available both online via HD Video Call and in-person in Bengaluru.",
          },
        },
      ],
    },
  ],
};

export default async function VedicAstrologyConsultationPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("vedic-astrology-consultation");
  } catch (_) {}

  const fallbackOffering = {
    id: 2,
    type: "Consultation" as const,
    title: "Vedic Astrology Consultation",
    slug: "vedic-astrology-consultation",
    short_description: "Comprehensive birth chart analysis, planetary transit assessment, and personalized remedial guidance.",
    full_description: "Detailed 1-on-1 consultation analyzing your Janma Kundali (horoscope), Vimshottari Dasha periods, and planetary transits. Shri Pradeep Nadig offers authentic Vedic remedial recommendations for health, career, relationships, and spiritual growth.",
    images: ["/images/services/vedic-astrology-consultation.jpg"],
    display_order: 2,
    status: "Published",
    seo_title: "Vedic Astrology Consultation",
    seo_description: "Expert horoscope analysis and Vedic remedies.",
    faq: [
      { question: "What details are required?", answer: "Exact date of birth, time of birth, and place of birth are required for precise chart calculation." },
      { question: "Is online consultation available?", answer: "Yes, 1-on-1 consultations are conducted via Video Call or in-person." }
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
