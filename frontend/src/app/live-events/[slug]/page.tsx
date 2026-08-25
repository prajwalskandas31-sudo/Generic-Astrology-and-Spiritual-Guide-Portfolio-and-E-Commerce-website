import { notFound } from "next/navigation";
import PublicLayout from "@/components/PublicLayout";
import LiveEventDetailClient from "../LiveEventDetailClient";
import { getSettings, getLiveEventBySlug, getLiveEvents } from "@/lib/api-client";
import { Metadata } from "next";
import { buildEventSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface LiveEventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const events = await getLiveEvents();
    return events.map((e) => ({ slug: e.slug }));
  } catch (_) {
    return [
      { slug: "mahashivaratri-grand-night-2026" },
      { slug: "navratri-chandi-homa-live" },
      { slug: "solar-eclipse-shanti-pooja" },
      { slug: "monthly-pradosham-rudrabhishekam" },
    ];
  }
}

export async function generateMetadata({ params }: LiveEventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const event = await getLiveEventBySlug(slug);
    if (!event) throw new Error("Not found");

    const title = `${event.title} | Live Streaming & Remote Sankalpa`;
    const description = event.short_description || event.full_description || `Join live streaming and remote Sankalpa for ${event.title} conducted by Veda Brahma Shri Pradeep Nadig.`;
    const url = `https://pradeepnadig.in/live-events/${slug}`;
    const eventImages = (event as any).images || ((event as any).cover_image ? [(event as any).cover_image] : []);

    return {
      title,
      description,
      keywords: [
        event.title,
        "Live Vedic Event",
        "Online Sankalpa",
        "Surya Grahan Shanti",
        "Pradeep Nadig Live Event",
        "Mahashivaratri Live Stream",
        "Navratri Homa Live",
      ],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Pradeep Nadig",
        images: eventImages.length > 0 ? [{ url: eventImages[0] }] : ["/pradeep-nadig.jpg"],
      },
    };
  } catch (_) {
    return {
      title: "Live Sacred Event | Veda Brahma Shri Pradeep Nadig",
    };
  }
}

export default async function LiveEventDetailPage({ params }: LiveEventDetailPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let settings: Record<string, any> = {};
  let event: any = null;

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    event = await getLiveEventBySlug(slug);
  } catch (_) {}

  if (!event) {
    notFound();
  }

  const eventSchema = buildEventSchema(event);
  const faqSchema = event.faq && event.faq.length > 0 ? buildFAQSchema(event.faq) : null;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", item: "https://pradeepnadig.in" },
    { name: "Live Events", item: "https://pradeepnadig.in/live-events" },
    { name: event.title, item: `https://pradeepnadig.in/live-events/${slug}` },
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
      <LiveEventDetailClient event={event} />
    </PublicLayout>
  );
}
