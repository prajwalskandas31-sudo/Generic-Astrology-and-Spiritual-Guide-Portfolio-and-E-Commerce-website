import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Ayushya Homa in Bangalore for Health & Longevity | Pradeep Nadig",
  description:
    "Invoke blessings for health, vitality, and long life with authentic Ayushya Homa in Bengaluru. Ideal for birthdays, children, and health recovery. Vedic vidhi by Shri Pradeep Nadig.",
  keywords: [
    "Ayushya Homa",
    "Ayushya Homa Bangalore",
    "Birthday Pooja Purohit",
    "Health Homa Bengaluru",
    "Pradeep Nadig Homa",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/ayushya-homa",
  },
  openGraph: {
    title: "Book Ayushya Homa in Bangalore for Health & Longevity | Pradeep Nadig",
    description:
      "Invoke blessings for long life, health, and vitality with authentic Ayushya Homa by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/services/ayushya-homa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Ayushya Homa",
      serviceType: "Vedic Homa Ritual",
      description:
        "Ayushya Homa is performed to pray for a long, healthy, and prosperous life, especially on birthdays, for young children, and during major health recovery.",
      url: "https://pradeepnadig.in/services/ayushya-homa",
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
          name: "When should Ayushya Homa be performed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is traditionally performed on birthdays (especially 1st, 60th, and annual birthdays) or during health recovery.",
          },
        },
        {
          "@type": "Question",
          name: "How long does Ayushya Homa take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Around 2 to 3 hours, including sankalpa, Ayushya sukta chanting, and sacred fire oblations.",
          },
        },
      ],
    },
  ],
};

export default async function AyushyaHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("ayushya-homa");
  } catch (_) {}

  const fallbackOffering = {
    who_benefits: "Invokes divine blessings of Markandeya & Ayur Devatas for long life, healthy development, immunity, and vitality.",
    where_performed: "Conducted at home, event halls, or family prayer spaces.",
    when_performed: "First birthday of a child (Ayushya Homa), annual birthdays, or recovery after illness.",
    who_should_attend: "Infants, birthday celebrated individuals, parents, grandparents, and well-wishers.",
    vidhi_details: "Ayur Devata Sthapana, Charu (sweet rice) Ahuti, Brahma-Vishnu-Shiva Ayur Sukta chanting, Ghee oblations, Kalasabhishekam for the child, and Prasadam.",
    
    id: 4,
    type: "Service" as const,
    title: "Ayushya Homa",
    slug: "ayushya-homa",
    short_description: "Performed to pray for a long, healthy, and prosperous life, especially on birthdays.",
    full_description: "Ayushya Homa is performed to pray for a long, healthy, and prosperous life. It is especially performed on birthdays, for young children, and during important life milestones.",
    images: ["/images/services/ayushya-homa.jpg"],
    display_order: 4,
    status: "Published",
    seo_title: "Ayushya Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Invoke blessings for health, vitality, and longevity with authentic Ayushya Homa.",
    faq: [
      { question: "When should Ayushya Homa be performed?", answer: "Commonly on birthdays, especially the first birthday and annual birthdays." },
      { question: "How long does it take?", answer: "Around 2 to 3 hours." }
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
