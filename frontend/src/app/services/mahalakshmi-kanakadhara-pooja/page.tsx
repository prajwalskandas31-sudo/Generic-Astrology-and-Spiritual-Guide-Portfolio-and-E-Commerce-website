import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Mahalakshmi Kanakadhara Pooja in Bangalore | Pradeep Nadig",
  description:
    "Special ritual dedicated to Goddess Mahalakshmi for financial prosperity, business growth, and abundance. Authentic Vedic ritual performed by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Mahalakshmi Kanakadhara Pooja",
    "Mahalakshmi Kanakadhara Pooja Bangalore",
    "Book Mahalakshmi Kanakadhara Pooja Online",
    "Pradeep Nadig Pooja Services",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/mahalakshmi-kanakadhara-pooja",
  },
  openGraph: {
    title: "Book Mahalakshmi Kanakadhara Pooja in Bangalore | Pradeep Nadig",
    description: "Special ritual dedicated to Goddess Mahalakshmi for financial prosperity, business growth, and abundance.",
    url: "https://pradeepnadig.in/services/mahalakshmi-kanakadhara-pooja",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Mahalakshmi Kanakadhara Pooja",
      serviceType: "Vedic Pooja Ritual",
      description: "Mahalakshmi Kanakadhara Pooja is performed with Kanakadhara Stotram recitations and Sri Sukta vidhi to invoke Goddess Lakshmi's eternal grace, removing debt, financial hardship, and bringing sustained prosperity.",
      url: "https://pradeepnadig.in/services/mahalakshmi-kanakadhara-pooja",
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
            "name": "Who should perform Kanakadhara Pooja?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Recommended for business owners, families, and anyone seeking financial stability and freedom from debt."
            }
      }
],
    },
  ],
};

export default async function MahalakshmiKanakadharaPoojaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("mahalakshmi-kanakadhara-pooja");
  } catch (_) {}

  const fallbackOffering = {
    id: 100,
    type: "Pooja" as const,
    title: "Mahalakshmi Kanakadhara Pooja",
    slug: "mahalakshmi-kanakadhara-pooja",
    short_description: "Special ritual dedicated to Goddess Mahalakshmi for financial prosperity, business growth, and abundance.",
    full_description: "Mahalakshmi Kanakadhara Pooja is performed with Kanakadhara Stotram recitations and Sri Sukta vidhi to invoke Goddess Lakshmi's eternal grace, removing debt, financial hardship, and bringing sustained prosperity.",
    images: ["/images/services/lakshmi-narayana-hrudaya-homa.jpg"],
    display_order: 1,
    status: "Published",
    seo_title: "Mahalakshmi Kanakadhara Pooja | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Special ritual dedicated to Goddess Mahalakshmi for financial prosperity, business growth, and abundance.",
    who_benefits: "Business owners, entrepreneurs, working professionals, and families seeking financial growth and stability.",
    where_performed: "Performed at business offices, retail shops, factories, or home altars.",
    when_performed: "Fridays, Varalakshmi Vratha, Diwali Lakshmi Pooja day, or at the launch of new business ventures.",
    who_should_attend: "Business partners, shop owners, family elders, and household members.",
    vidhi_details: "Ashta Lakshmi Kalasa Sthapana, Lotus Flower Archana, Kanakadhara Stotram 108 recitations, Sri Sukta Homa/Pooja, Kumkuma Archana, and Naivedya offering.",
    faq: [
      {
            "question": "Who should perform Kanakadhara Pooja?",
            "answer": "Recommended for business owners, families, and anyone seeking financial stability and freedom from debt."
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
