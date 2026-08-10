import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Durga Saptashati Parayana & Pooja in Bangalore | Pradeep Nadig",
  description:
    "Recitation of 700 sacred mantras of Devi Mahatmyam for victory over hardships and supreme protection. Authentic Vedic ritual performed by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Durga Saptashati Parayana & Pooja",
    "Durga Saptashati Parayana & Pooja Bangalore",
    "Book Durga Saptashati Parayana & Pooja Online",
    "Pradeep Nadig Pooja Services",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/durga-saptashati-pooja",
  },
  openGraph: {
    title: "Book Durga Saptashati Parayana & Pooja in Bangalore | Pradeep Nadig",
    description: "Recitation of 700 sacred mantras of Devi Mahatmyam for victory over hardships and supreme protection.",
    url: "https://pradeepnadig.in/services/durga-saptashati-pooja",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Durga Saptashati Parayana & Pooja",
      serviceType: "Vedic Devi Parayana",
      description: "Durga Saptashati Parayana & Pooja is an auspicious ritual worshipping the Divine Mother in her various manifestations, bringing destruction of negativity, supreme peace, and material and spiritual well-being.",
      url: "https://pradeepnadig.in/services/durga-saptashati-pooja",
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
            "name": "Duration?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Usually 3 to 4 hours."
            }
      }
],
    },
  ],
};

export default async function DurgaSaptashatiPoojaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("durga-saptashati-pooja");
  } catch (_) {}

  const fallbackOffering = {
    id: 100,
    type: "Pooja" as const,
    title: "Durga Saptashati Parayana & Pooja",
    slug: "durga-saptashati-pooja",
    short_description: "Recitation of 700 sacred mantras of Devi Mahatmyam for victory over hardships and supreme protection.",
    full_description: "Durga Saptashati Parayana & Pooja is an auspicious ritual worshipping the Divine Mother in her various manifestations, bringing destruction of negativity, supreme peace, and material and spiritual well-being.",
    images: ["/images/services/chandika-homa.jpg"],
    display_order: 1,
    status: "Published",
    seo_title: "Durga Saptashati Parayana & Pooja | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Recitation of 700 sacred mantras of Devi Mahatmyam for victory over hardships and supreme protection.",
    who_benefits: "Devotees seeking supreme protection from Goddess Durga, overcoming deep life struggles, and family peace.",
    where_performed: "Homes, prayer mandaps, or temple halls.",
    when_performed: "Navaratri days, Tuesdays, Fridays, Ashtami, and Navami Tithis.",
    who_should_attend: "All family members and spiritual seekers.",
    vidhi_details: "Kavacha, Argala, Kilaka recitations, 13 Adhyaya Durga Saptashati Parayana, Chandi Navakshari Japa, Kumkumarchana, and Mahamangalarthi.",
    faq: [
      {
            "question": "Duration?",
            "answer": "Usually 3 to 4 hours."
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
