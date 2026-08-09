import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Subrahmanya Homa in Bangalore for Courage & Success | Pradeep Nadig",
  description:
    "Dedicated to Lord Subrahmanya (Murugan/Kartikeya) for courage, wisdom, career victory, and relief from Naga Dosha in Bengaluru. Vedic vidhi by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Subrahmanya Homa",
    "Subrahmanya Homa Bangalore",
    "Murugan Homa Bengaluru",
    "Kuja Kuja Dosha Remedies",
    "Pradeep Nadig Homa Rituals",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/subrahmanya-homa",
  },
  openGraph: {
    title: "Book Subrahmanya Homa in Bangalore for Courage & Success | Pradeep Nadig",
    description:
      "Invoke Lord Subrahmanya's divine grace for courage, career growth, and victory by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/services/subrahmanya-homa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Subrahmanya Homa",
      serviceType: "Vedic Homa Ritual",
      description:
        "Dedicated to Lord Subrahmanya (Murugan/Kartikeya) for courage, wisdom, victory over enemies and obstacles, relief from Kuja/Naga Dosha, and career growth.",
      url: "https://pradeepnadig.in/services/subrahmanya-homa",
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
          name: "Who should perform Subrahmanya Homa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Recommended for students, working professionals, individuals facing Kuja (Mars) dosha, or those seeking courage and competitive success.",
          },
        },
        {
          "@type": "Question",
          name: "How long does Subrahmanya Homa take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Around 2.5 to 3 hours, including Subrahmanya Trishati chanting, red flower archana, and fire oblations.",
          },
        },
      ],
    },
  ],
};

export default async function SubrahmanyaHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("subrahmanya-homa");
  } catch (_) {}

  const fallbackOffering = {
    id: 10,
    type: "Service" as const,
    title: "Subrahmanya Homa",
    slug: "subrahmanya-homa",
    short_description: "Dedicated to Lord Subrahmanya for courage, wisdom, victory over obstacles, and relief from doshas.",
    full_description: "Subrahmanya Homa is dedicated to Lord Subrahmanya (Murugan/Kartikeya) for courage, wisdom, victory over obstacles, relief from Naga Dosha, and overall success in life.",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200"],
    display_order: 10,
    status: "Published",
    seo_title: "Subrahmanya Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Invoke Lord Subrahmanya's grace for courage, career growth, and victory.",
    faq: [
      { question: "Who should perform Subrahmanya Homa?", answer: "Recommended for students, professionals, families, and those seeking relief from Naga-related doshas." },
      { question: "Duration?", answer: "Around 2.5 to 3 hours." }
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
