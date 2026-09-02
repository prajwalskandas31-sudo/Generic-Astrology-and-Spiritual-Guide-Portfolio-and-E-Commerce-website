import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

const LEGACY_CONSULTATION_SLUGS = [
  "janma-kundali-birth-chart-reading",
  "marriage-matching-kundali-milan",
  "career-business-astrology",
  "gemstone-rudraksha-recommendation",
  "prashna-marga-horary-astrology",
];

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const offering = await getOfferingBySlug(slug);
    const title = offering.seo_title || `Book ${offering.title} in Bangalore | Pradeep Nadig`;
    const description = offering.seo_description || offering.short_description;
    const url = `https://pradeepnadig.in/consultations/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Pradeep Nadig",
        images: offering.images?.[0] ? [{ url: offering.images[0] }] : [],
      },
    };
  } catch (_) {
    return {
      title: "Vedic Consultation | Veda Brahma Shri Pradeep Nadig",
    };
  }
}

export default async function ConsultationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (LEGACY_CONSULTATION_SLUGS.includes(slug)) {
    redirect("/consultations/vedic-astrology-consultation");
  }

  let offering: any = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug(slug);
  } catch (_) {
    notFound();
  }

  if (!offering) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: offering.title,
        serviceType: "Vedic Astrology Consultation",
        description: offering.short_description || offering.full_description,
        url: `https://pradeepnadig.in/consultations/${slug}`,
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
      ...(offering.faq && offering.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: offering.faq.map((item: any) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <PublicLayout settings={settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          <OfferingDetailClient offering={offering} />
        </div>
      </section>
    </PublicLayout>
  );
}
