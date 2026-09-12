import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { FALLBACK_OFFERINGS } from "@/lib/fallback-data";

export const revalidate = 60;

import { buildServiceSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return FALLBACK_OFFERINGS.map((offering) => ({
    slug: offering.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const offering = await getOfferingBySlug(slug);
    const title = offering.seo_title || `Book ${offering.title} in Bangalore | Pradeep Nadig`;
    const description = offering.seo_description || offering.short_description || offering.full_description;
    const url = `https://pradeepnadig.in/services/${slug}`;

    return {
      title,
      description,
      keywords: [
        offering.title,
        "Kannada Purohit near me",
        "Ganapathi Homa Pandit",
        "Vedic Ritual Bangalore",
        "Pradeep Nadig Services",
        "Pooja Services Bengaluru",
      ],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Pradeep Nadig",
        images: offering.images?.[0] ? [{ url: offering.images[0] }] : ["/pradeep-nadig.jpg"],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: offering.images?.[0] ? [offering.images[0]] : ["/pradeep-nadig.jpg"],
      },
    };
  } catch (_) {
    return {
      title: "Vedic Service | Veda Brahma Shri Pradeep Nadig",
    };
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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

  const serviceSchema = buildServiceSchema(offering);
  const faqSchema = offering.faq && offering.faq.length > 0 ? buildFAQSchema(offering.faq) : null;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", item: "https://pradeepnadig.in" },
    { name: "Services", item: "https://pradeepnadig.in/services" },
    { name: offering.title, item: `https://pradeepnadig.in/services/${slug}` },
  ]);

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema,
      ...(serviceSchema ? [serviceSchema] : []),
      ...(faqSchema ? [faqSchema] : []),
    ],
  };

  return (
    <PublicLayout settings={settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          <OfferingDetailClient offering={offering} />
        </div>
      </section>
    </PublicLayout>
  );
}
