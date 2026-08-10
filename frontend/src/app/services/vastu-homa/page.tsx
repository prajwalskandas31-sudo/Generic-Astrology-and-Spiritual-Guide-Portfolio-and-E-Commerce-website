import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Vastu Homa in Bangalore for Griha Pravesha & Space Purification | Pradeep Nadig",
  description:
    "Purify homes, offices, and commercial spaces, remove Vastu doshas, and invite positive energy with Vastu Homa in Bengaluru. Ideal for Griha Pravesha. Vedic vidhi by Shri Pradeep Nadig.",
  keywords: [
    "Vastu Homa",
    "Vastu Homa Bangalore",
    "Griha Pravesha Pooja Bengaluru",
    "Vastu Shanthi Homa",
    "Pradeep Nadig Vastu Purohit",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/vastu-homa",
  },
  openGraph: {
    title: "Book Vastu Homa in Bangalore for Griha Pravesha | Pradeep Nadig",
    description:
      "Purify homes and commercial spaces, eliminate Vastu doshas, and invite divine peace with Vastu Homa by Veda Brahma Shri Pradeep Nadig.",
    url: "https://pradeepnadig.in/services/vastu-homa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Vastu Homa",
      serviceType: "Vedic Homa Ritual",
      description:
        "Vastu Homa is performed to purify residential and commercial properties, correct structural/energetic Vastu doshas, and invite prosperity during Griha Pravesha or housewarming.",
      url: "https://pradeepnadig.in/services/vastu-homa",
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
          name: "When should Vastu Homa be performed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Before moving into a new home (Griha Pravesha), after major house renovations, or when starting a new commercial establishment.",
          },
        },
        {
          "@type": "Question",
          name: "How long does Vastu Homa take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Typically 2.5 to 3.5 hours, including Vastu Purusha pooja, kalasha sthapana, and homa oblations.",
          },
        },
      ],
    },
  ],
};

export default async function VastuHomaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("vastu-homa");
  } catch (_) {}

  const fallbackOffering = {
    who_benefits: "Purifies domestic & commercial property, neutralizes structural Vastu Doshas, attracts wealth, and creates peaceful living environments.",
    where_performed: "At the specific home, newly built apartment, plot, or commercial office.",
    when_performed: "Before Griha Pravesha (housewarming), after major structural renovations, or when experiencing unexplained disturbances in a house.",
    who_should_attend: "Property owners, family members, partners, and residents.",
    vidhi_details: "Vastu Purusha Mandala Sthapana, Digpalaka Bali, Navadhanya & Wooden Samidha offerings, Vastu Purusha Pooja, Kalasa Prokshana throughout all rooms, and Sthapati Nirmalya.",
    
    id: 7,
    type: "Service" as const,
    title: "Vastu Homa",
    slug: "vastu-homa",
    short_description: "Purify homes, offices, and commercial spaces, remove Vastu doshas, and invite positive energy.",
    full_description: "Vastu Homa is performed to purify homes, offices, and commercial spaces, remove Vastu doshas, and invite peace, prosperity, and positive energy into the property.",
    images: ["/images/services/vastu-homa.jpg"],
    display_order: 7,
    status: "Published",
    seo_title: "Vastu Homa | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Purify property and remove Vastu doshas with authentic Vastu Homa rituals.",
    faq: [
      { question: "When should Vastu Homa be performed?", answer: "Before entering a new home, after renovations, or when experiencing persistent disturbances." },
      { question: "Duration?", answer: "Typically 2.5 to 3.5 hours." }
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
