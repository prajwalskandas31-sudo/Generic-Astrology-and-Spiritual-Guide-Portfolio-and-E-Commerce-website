import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Mahaganapathi Homa in Bangalore | Pradeep Nadig",
  description:
    "Perform sacred Mahaganapathi Homa for removing obstacles, invoking prosperity, and auspicious beginnings in Bengaluru. Complete Vedic vidhi & 108 dravya ahuti by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Ganapathi Homa",
    "Ganapathi Homa Bangalore",
    "Book Ganapathi Homa Online",
    "Ganesh Homa Purohit Bengaluru",
    "Pradeep Nadig Pooja Services",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/ganapathi-homa",
  },
  openGraph: {
    title: "Book Mahaganapathi Homa in Bangalore | Pradeep Nadig",
    description:
      "Perform Mahaganapathi Homa for obstacle removal and prosperous beginnings with authentic Vedic rituals by Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/services/ganapathi-homa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Mahaganapathi Homa",
      serviceType: "Vedic Homa Ritual",
      description:
        "Sacred fire ritual dedicated to Lord Ganesha for overcoming obstacles and invoking auspicious beginnings with 108 dravya ahuti and Atharvashirsha mantras.",
      url: "https://pradeepnadig.in/services/ganapathi-homa",
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
          name: "What materials are required for Ganapathi Homa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All sacred dravya, modaka, pure ghee, dry coconut, and samithu materials are arranged by Veda Brahma Shri Pradeep Nadig.",
          },
        },
        {
          "@type": "Question",
          name: "Can Ganapathi Homa be conducted at home or office?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Mahaganapathi Homa can be performed at your residence, commercial office, or chosen venue.",
          },
        },
      ],
    },
  ],
};

export default async function GanapathiHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("ganapathi-homa");
  } catch (_) {}

  const fallbackOffering = {
    who_benefits: "Removes all unseen obstacles, grants clarity of thought, bestows success in new ventures, and brings peace to homes and businesses.",
    where_performed: "Conducted at homes, newly constructed houses, business offices, or designated sacred halls in Bengaluru.",
    when_performed: "Ideal during housewarmings (Griha Pravesha), before launching a business, weddings, annual family prayers, or Sankashti Chaturthi.",
    who_should_attend: "Entire family, business partners, house-owners, newlyweds, and individuals starting new career or academic milestones.",
    vidhi_details: "Includes Mahaganapathi Avahana, Atharvashirsha Trishati Chanting, Modaka, Ashta Dravya, Sugandhi Dravya & Ghee 108 Ahuti offerings, Poornahuti, and Modaka Prasadam.",
    
    id: 1,
    type: "Service" as const,
    title: "Mahaganapathi Homa",
    slug: "ganapathi-homa",
    short_description: "Sacred fire ritual dedicated to Lord Ganesha for overcoming obstacles and invoking auspicious beginnings.",
    full_description: "Mahaganapathi Homa is performed to seek the blessings of Lord Ganesha, the lord of auspicious beginnings and remover of all impediments. This sacred Vedic fire ritual includes 108 dravya ahuti chanting authentic Atharvashirsha mantras.",
    images: ["/images/services/ganapathi-homa.jpg"],
    display_order: 1,
    status: "Published",
    seo_title: "Ganapathi Homa Rituals",
    seo_description: "Perform Mahaganapathi Homa for peace and obstacle removal.",
    faq: [
      { question: "What materials are required?", answer: "All sacred dravya, modaka, ghee, and samithu materials will be arranged by us." },
      { question: "Can this be conducted at home?", answer: "Yes, this homa can be performed at your residence, office, or selected venue." }
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
