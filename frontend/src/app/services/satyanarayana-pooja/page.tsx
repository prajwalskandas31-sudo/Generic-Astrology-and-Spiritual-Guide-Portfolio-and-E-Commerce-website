import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Sri Satyanarayana Vratha & Pooja in Bangalore | Pradeep Nadig",
  description:
    "A revered Vedic ritual dedicated to Lord Satyanarayana for family prosperity, peace, and fulfillment of noble desires. Authentic Vedic ritual performed by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Sri Satyanarayana Vratha & Pooja",
    "Sri Satyanarayana Vratha & Pooja Bangalore",
    "Book Sri Satyanarayana Vratha & Pooja Online",
    "Pradeep Nadig Pooja Services",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/satyanarayana-pooja",
  },
  openGraph: {
    title: "Book Sri Satyanarayana Vratha & Pooja in Bangalore | Pradeep Nadig",
    description: "A revered Vedic ritual dedicated to Lord Satyanarayana for family prosperity, peace, and fulfillment of noble desires.",
    url: "https://pradeepnadig.in/services/satyanarayana-pooja",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Sri Satyanarayana Vratha & Pooja",
      serviceType: "Vedic Pooja Ritual",
      description: "Sri Satyanarayana Vratha & Pooja is a sacred worship of Lord Vishnu in his Satyanarayana form. Traditionally performed on Full Moon (Purnima) days, housewarmings, or anniversaries, it bestows peace, family harmony, financial stability, and divine protection.",
      url: "https://pradeepnadig.in/services/satyanarayana-pooja",
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
            "name": "When is the ideal time to perform Satyanarayana Pooja?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Full Moon (Purnima) days, Ekadashi, housewarmings, or family anniversaries."
            }
      },
      {
            "@type": "Question",
            "name": "How long does the Pooja take?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Approximately 2 to 2.5 hours including story narration and Mangalarthi."
            }
      }
],
    },
  ],
};

export default async function SatyanarayanaPoojaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("satyanarayana-pooja");
  } catch (_) {}

  const fallbackOffering = {
    id: 100,
    type: "Pooja" as const,
    title: "Sri Satyanarayana Vratha & Pooja",
    slug: "satyanarayana-pooja",
    short_description: "A revered Vedic ritual dedicated to Lord Satyanarayana for family prosperity, peace, and fulfillment of noble desires.",
    full_description: "Sri Satyanarayana Vratha & Pooja is a sacred worship of Lord Vishnu in his Satyanarayana form. Traditionally performed on Full Moon (Purnima) days, housewarmings, or anniversaries, it bestows peace, family harmony, financial stability, and divine protection.",
    images: ["/images/services/satyanarayana-pooja.jpg"],
    display_order: 1,
    status: "Published",
    seo_title: "Sri Satyanarayana Vratha & Pooja | Veda Brahma Shri Pradeep Nadig",
    seo_description: "A revered Vedic ritual dedicated to Lord Satyanarayana for family prosperity, peace, and fulfillment of noble desires.",
    who_benefits: "Brings peace, happiness, unity, and abundance to families, home-owners, newlyweds, and business owners.",
    where_performed: "Conducted at your home, apartment, commercial office space, or selected prayer mandap in Bengaluru.",
    when_performed: "Ideal on Purnima (Full Moon), Ekadashi, Sankranti, housewarmings (Griha Pravesha), weddings, or birthdays.",
    who_should_attend: "All family members, relatives, friends, and devotees are encouraged to attend and partake in Prasadam.",
    vidhi_details: "Includes Ganapathi Pooja, Navagraha Smarana, Kalasa Sthapana, Satyanarayana Ashtottara Shatanamavali, 5 Sacred Katha Adhyayas (Stories), Panchamrutha Abhishekam, Mahamangalarthi, and Distribution of Wheat Sheera Prasadam.",
    faq: [
      {
            "question": "When is the ideal time to perform Satyanarayana Pooja?",
            "answer": "Full Moon (Purnima) days, Ekadashi, housewarmings, or family anniversaries."
      },
      {
            "question": "How long does the Pooja take?",
            "answer": "Approximately 2 to 2.5 hours including story narration and Mangalarthi."
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
