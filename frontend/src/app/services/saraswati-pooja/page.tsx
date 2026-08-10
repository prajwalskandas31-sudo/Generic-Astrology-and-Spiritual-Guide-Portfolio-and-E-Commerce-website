import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Sri Saraswati Vidya Pooja in Bangalore | Pradeep Nadig",
  description:
    "Invoke Goddess Saraswati for academic excellence, wisdom, memory power, and creative mastery. Authentic Vedic ritual performed by Veda Brahma Shri Pradeep Nadig.",
  keywords: [
    "Sri Saraswati Vidya Pooja",
    "Sri Saraswati Vidya Pooja Bangalore",
    "Book Sri Saraswati Vidya Pooja Online",
    "Pradeep Nadig Pooja Services",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/services/saraswati-pooja",
  },
  openGraph: {
    title: "Book Sri Saraswati Vidya Pooja in Bangalore | Pradeep Nadig",
    description: "Invoke Goddess Saraswati for academic excellence, wisdom, memory power, and creative mastery.",
    url: "https://pradeepnadig.in/services/saraswati-pooja",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Sri Saraswati Vidya Pooja",
      serviceType: "Vedic Educational Pooja",
      description: "Sri Saraswati Vidya Pooja is performed for students, scholars, artists, and educators to enhance intellect, concentration, public speaking abilities, and success in studies and competitive examinations.",
      url: "https://pradeepnadig.in/services/saraswati-pooja",
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
            "name": "When is Saraswati Pooja recommended?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Before academic exams, initiation of learning (Vidyarambha), or on Vasant Panchami/Navaratri."
            }
      }
],
    },
  ],
};

export default async function SaraswatiPoojaPage() {
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug("saraswati-pooja");
  } catch (_) {}

  const fallbackOffering = {
    id: 100,
    type: "Pooja" as const,
    title: "Sri Saraswati Vidya Pooja",
    slug: "saraswati-pooja",
    short_description: "Invoke Goddess Saraswati for academic excellence, wisdom, memory power, and creative mastery.",
    full_description: "Sri Saraswati Vidya Pooja is performed for students, scholars, artists, and educators to enhance intellect, concentration, public speaking abilities, and success in studies and competitive examinations.",
    images: ["/images/services/saraswati-pooja.jpg"],
    display_order: 1,
    status: "Published",
    seo_title: "Sri Saraswati Vidya Pooja | Veda Brahma Shri Pradeep Nadig",
    seo_description: "Invoke Goddess Saraswati for academic excellence, wisdom, memory power, and creative mastery.",
    who_benefits: "School & college students, competitive exam aspirants, musicians, writers, and educators.",
    where_performed: "At home study rooms, educational institutions, or music/dance academies.",
    when_performed: "Vasant Panchami, Navaratri Saraswati Pooja day, Vidyarambha, or prior to major examination seasons.",
    who_should_attend: "Students, children, parents, and teachers.",
    vidhi_details: "Saraswati Avahana, Pustaka/Instrument Pooja, Medha Sukta Chanting, 108 Namavali Archana with white flowers, Aksharabhyasa ritual (if for young toddlers), and Vidya Naivedya.",
    faq: [
      {
            "question": "When is Saraswati Pooja recommended?",
            "answer": "Before academic exams, initiation of learning (Vidyarambha), or on Vasant Panchami/Navaratri."
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
