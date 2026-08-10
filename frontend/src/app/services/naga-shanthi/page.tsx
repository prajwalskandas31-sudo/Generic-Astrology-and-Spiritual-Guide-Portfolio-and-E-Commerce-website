import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Naga Shanthi & Sarpa Dosha Pooja in Bangalore | Pradeep Nadig",
  description:
    "Seek blessings of Naga Devatas, alleviate Sarpa Dosha, and overcome obstacles in marriage, childbirth & health in Bengaluru. Authentic Vedic rituals by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Naga Shanthi",
    "Naga Shanthi Bangalore",
    "Sarpa Dosha Pooja Bengaluru",
    "Kalasarpa Shanthi Purohit",
    "Pradeep Nadig Pooja Services",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/naga-shanthi",
  },
  openGraph: {
    title: "Book Naga Shanthi & Sarpa Dosha Pooja in Bangalore | Pradeep Nadig",
    description:
      "Perform Naga Shanthi to mitigate Sarpa Dosha and invite peace, lineage growth, and family harmony by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/services/naga-shanthi",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Naga Shanthi",
      serviceType: "Vedic Homa Ritual",
      description:
        "Performed to seek the blessings of Naga Devatas, alleviate Sarpa Dosha, and remove obstacles related to marriage delays, fertility, health, and ancestral karma.",
      url: "https://pradeepnadig.in/services/naga-shanthi",
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
          name: "When is Naga Shanthi recommended?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When indicated in horoscope analysis (Rahu-Ketu placement, Sarpa Dosha), for delays in marriage, or difficulties in conceiving.",
          },
        },
        {
          "@type": "Question",
          name: "How long does Naga Shanthi take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Usually 2.5 to 3.5 hours, involving Nagabali, prathishta, and sacred mantra chanting.",
          },
        },
      ],
    },
  ],
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
    images: ["/images/services/naga-shanthi.jpg"],
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
