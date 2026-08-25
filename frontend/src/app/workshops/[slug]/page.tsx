import PublicLayout from "@/components/PublicLayout";
import { getWorkshopBySlug, getSettings } from "@/lib/api-client";
import WorkshopDetailClient from "@/components/WorkshopDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FALLBACK_WORKSHOPS } from "@/lib/fallback-data";
import { buildEventSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  return FALLBACK_WORKSHOPS.map((workshop) => ({
    slug: workshop.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const workshop = await getWorkshopBySlug(slug);
    if (!workshop) throw new Error("Not found");

    const title = workshop.seo_title || `${workshop.title} | Veda Brahma Shri Pradeep Nadig`;
    const description = workshop.seo_description || workshop.description || `Join workshop ${workshop.title} conducted by Veda Brahma Shri Pradeep Nadig.`;
    const url = `https://pradeepnadig.in/workshops/${slug}`;

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
        images: workshop.images && workshop.images.length > 0 ? [{ url: workshop.images[0] }] : ["/pradeep-nadig.jpg"],
      },
    };
  } catch (_) {
    return {
      title: "Workshop | Veda Brahma Shri Pradeep Nadig",
    };
  }
}

export default async function WorkshopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let workshop = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    workshop = await getWorkshopBySlug(slug);
  } catch (_) {}

  if (!workshop) {
    workshop = FALLBACK_WORKSHOPS.find((w) => w.slug === slug);
  }

  if (!workshop) {
    notFound();
  }

  const eventSchema = buildEventSchema({
    title: workshop.title,
    short_description: workshop.short_description || workshop.description,
    event_date: workshop.start_date,
    venue_address: workshop.location,
    venue_type: workshop.mode === "Online" ? "Online" : "In-Person",
    price: workshop.price,
    slug: workshop.slug,
    images: workshop.images,
  });

  const faqSchema = workshop.faq && workshop.faq.length > 0 ? buildFAQSchema(workshop.faq) : null;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", item: "https://pradeepnadig.in" },
    { name: "Workshops", item: "https://pradeepnadig.in/workshops" },
    { name: workshop.title, item: `https://pradeepnadig.in/workshops/${slug}` },
  ]);

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema,
      ...(eventSchema ? [eventSchema] : []),
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
          <WorkshopDetailClient workshop={workshop} />
        </div>
      </section>
    </PublicLayout>
  );
}
