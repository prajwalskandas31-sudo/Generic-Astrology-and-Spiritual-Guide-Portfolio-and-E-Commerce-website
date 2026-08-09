import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Chandika Homa in Bangalore for Protection & Victory | Pradeep Nadig",
  description:
    "Powerful Vedic fire ritual dedicated to Goddess Chandika for overcoming severe hardships, legal issues, and obstacles in Bengaluru. Vedic vidhi by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Chandika Homa",
    "Chandika Homa Bangalore",
    "Chandi Homa Purohit",
    "Durga Chandika Homa Bengaluru",
    "Pradeep Nadig Pooja",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/chandika-homa",
  },
  openGraph: {
    title: "Book Chandika Homa in Bangalore for Victory & Protection | Pradeep Nadig",
    description:
      "Powerful Vedic fire ritual dedicated to Goddess Chandika for victory over obstacles by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/services/chandika-homa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Chandika Homa",
      serviceType: "Vedic Homa Ritual",
      description:
        "Sacred fire ritual dedicated to Goddess Chandika for victory over severe difficulties, removal of negative energies, and ultimate spiritual protection.",
      url: "https://pradeepnadig.in/services/chandika-homa",
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
          name: "Who should perform Chandika Homa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Recommended for individuals or families facing persistent hardships, complex legal battles, or seeking divine mother's grace.",
          },
        },
        {
          "@type": "Question",
          name: "What is the duration of Chandika Homa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Usually 3 to 5 hours, including Durga Saptashati parayana and sacred fire ahuti.",
          },
        },
      ],
    },
  ],
};

export default async function ChandikaHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("chandika-homa");
  } catch (_) {}

  const fallbackOffering = {
    id: 6,
    type: "Service" as const,
    title: "Chandika Homa",
    slug: "chandika-homa",
    short_description: "A powerful Vedic fire ritual dedicated to Goddess Chandika for victory over severe obstacles.",
    full_description: "Chandika Homa is a powerful Vedic fire ritual dedicated to Goddess Chandika for victory over difficulties, removal of powerful negative influences, and protection from unseen obstacles.",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200"],
    display_order: 6,
    status: "Published",
    seo_title: "Chandika Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Powerful Chandika Homa for victory over hardships and severe obstacles.",
    faq: [
      { question: "Who should perform Chandika Homa?", answer: "Recommended for those facing persistent hardships, legal issues, or major life challenges." },
      { question: "Duration?", answer: "Usually 3 to 5 hours." }
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
