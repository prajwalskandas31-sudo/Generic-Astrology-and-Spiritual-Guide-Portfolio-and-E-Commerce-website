import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Sri Rudrabhishekam Pooja in Bangalore | Pradeep Nadig",
  description:
    "Sacred bathing ritual and elaborate worship of Shiva Linga accompanied by Sri Rudram chanting for health and protection. Authentic Vedic ritual performed by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Sri Rudrabhishekam Pooja",
    "Sri Rudrabhishekam Pooja Bangalore",
    "Book Sri Rudrabhishekam Pooja Online",
    "Pradeep Nadig Pooja Services",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/rudrabhishekam-pooja",
  },
  openGraph: {
    title: "Book Sri Rudrabhishekam Pooja in Bangalore | Pradeep Nadig",
    description: "Sacred bathing ritual and elaborate worship of Shiva Linga accompanied by Sri Rudram chanting for health and protection.",
    url: "https://pradeepnadig.in/services/rudrabhishekam-pooja",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Sri Rudrabhishekam Pooja",
      serviceType: "Vedic Abhisheka Ritual",
      description: "Sri Rudrabhishekam Pooja is an ancient Vedic ritual where Shiva Linga is ceremonially bathed with 11 sacred dravyas including milk, curd, honey, ghee, sugar, tender coconut water, and sandalwood paste while chanting Sri Rudram and Chamakam.",
      url: "https://pradeepnadig.in/services/rudrabhishekam-pooja",
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
            "name": "What materials are used for Abhisheka?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Milk, curd, honey, ghee, sugar, tender coconut water, fruit juices, and sacred Bilva leaves."
            }
      },
      {
            "@type": "Question",
            "name": "Duration?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "About 2 to 3 hours depending on the number of Rudra Avartanams."
            }
      }
],
    },
  ],
};

export default async function RudrabhishekamPoojaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("rudrabhishekam-pooja");
  } catch (_) {}

  const fallbackOffering = {
    id: 100,
    type: "Pooja" as const,
    title: "Sri Rudrabhishekam Pooja",
    slug: "rudrabhishekam-pooja",
    short_description: "Sacred bathing ritual and elaborate worship of Shiva Linga accompanied by Sri Rudram chanting for health and protection.",
    full_description: "Sri Rudrabhishekam Pooja is an ancient Vedic ritual where Shiva Linga is ceremonially bathed with 11 sacred dravyas including milk, curd, honey, ghee, sugar, tender coconut water, and sandalwood paste while chanting Sri Rudram and Chamakam.",
    images: ["/images/services/rudrabhishekam-pooja.jpg"],
    display_order: 1,
    status: "Published",
    seo_title: "Sri Rudrabhishekam Pooja | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Sacred bathing ritual and elaborate worship of Shiva Linga accompanied by Sri Rudram chanting for health and protection.",
    who_benefits: "Protects against chronic illness, negative energies, mental distress, financial blockages, and karmic impediments.",
    where_performed: "Can be performed at home, private prayer rooms, temple halls, or outdoors in quiet sanctums.",
    when_performed: "Mondays, Pradosham days, Masa Shivaratri, Shravana month, or during personal health recovery.",
    who_should_attend: "Individuals facing health issues, spiritual seekers, and entire families praying for health and peace.",
    vidhi_details: "Mahaganapathi Pooja, Sankalpa, Rudra Kalasa Sthapana, Ekadasa Dravya Abhisheka with continuous Sri Rudra Prashna chanting, Bilva Patra Archana, and Shanti Chanting.",
    faq: [
      {
            "question": "What materials are used for Abhisheka?",
            "answer": "Milk, curd, honey, ghee, sugar, tender coconut water, fruit juices, and sacred Bilva leaves."
      },
      {
            "question": "Duration?",
            "answer": "About 2 to 3 hours depending on the number of Rudra Avartanams."
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
