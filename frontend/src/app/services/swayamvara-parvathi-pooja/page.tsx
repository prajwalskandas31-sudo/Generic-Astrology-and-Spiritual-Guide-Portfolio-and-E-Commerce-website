import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Swayamvara Parvathi Pooja in Bangalore | Pradeep Nadig",
  description:
    "Powerful Vedic ritual dedicated to Goddess Parvathi for resolving marriage delays and ensuring marital harmony. Authentic Vedic ritual performed by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Swayamvara Parvathi Pooja",
    "Swayamvara Parvathi Pooja Bangalore",
    "Book Swayamvara Parvathi Pooja Online",
    "Pradeep Nadig Pooja Services",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/swayamvara-parvathi-pooja",
  },
  openGraph: {
    title: "Book Swayamvara Parvathi Pooja in Bangalore | Pradeep Nadig",
    description: "Powerful Vedic ritual dedicated to Goddess Parvathi for resolving marriage delays and ensuring marital harmony.",
    url: "https://pradeepnadig.in/services/swayamvara-parvathi-pooja",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Swayamvara Parvathi Pooja",
      serviceType: "Vedic Pooja Ritual",
      description: "Swayamvara Parvathi Pooja is a sacred ritual specifically recommended for overcoming obstacles in finding a suitable life partner, eliminating delays in marriage, and strengthening affection and understanding between married couples.",
      url: "https://pradeepnadig.in/services/swayamvara-parvathi-pooja",
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
            "name": "Can this Pooja be performed on behalf of someone?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, parents or close relatives can perform the Sankalpa in the person's name."
            }
      }
],
    },
  ],
};

export default async function SwayamvaraParvathiPoojaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("swayamvara-parvathi-pooja");
  } catch (_) {}

  const fallbackOffering = {
    id: 100,
    type: "Pooja" as const,
    title: "Swayamvara Parvathi Pooja",
    slug: "swayamvara-parvathi-pooja",
    short_description: "Powerful Vedic ritual dedicated to Goddess Parvathi for resolving marriage delays and ensuring marital harmony.",
    full_description: "Swayamvara Parvathi Pooja is a sacred ritual specifically recommended for overcoming obstacles in finding a suitable life partner, eliminating delays in marriage, and strengthening affection and understanding between married couples.",
    images: ["/images/services/swayamvara-parvathi-pooja.jpg"],
    display_order: 1,
    status: "Published",
    seo_title: "Swayamvara Parvathi Pooja | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Powerful Vedic ritual dedicated to Goddess Parvathi for resolving marriage delays and ensuring marital harmony.",
    who_benefits: "Single individuals looking for marriage, parents seeking good matches for children, and married couples aiming for harmony.",
    where_performed: "Performed at home prayer altars or designated sacred venues.",
    when_performed: "Fridays, auspicious Tithis, or when advised by Vedic astrology consultation.",
    who_should_attend: "The bride/groom-to-be, parents, or spouse.",
    vidhi_details: "Gauri Pooja, Swayamvara Parvathi Mantra Japa (108/1008 times), Turmeric/Kumkum Archana, Lotus flower offerings, Mangalya Bhagya Sankalpa, and Prasadam distribution.",
    faq: [
      {
            "question": "Can this Pooja be performed on behalf of someone?",
            "answer": "Yes, parents or close relatives can perform the Sankalpa in the person's name."
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
