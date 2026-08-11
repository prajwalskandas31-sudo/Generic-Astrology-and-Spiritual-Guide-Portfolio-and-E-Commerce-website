import { notFound } from "next/navigation";
import PublicLayout from "@/components/PublicLayout";
import LiveEventDetailClient from "../LiveEventDetailClient";
import { getSettings, getLiveEventBySlug, getLiveEvents } from "@/lib/api-client";

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

export default async function LiveEventDetailPage({ params }: LiveEventDetailPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let settings: Record<string, any> = {};
  let event: import("@/types").LiveEvent | null = null;

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    event = await getLiveEventBySlug(slug);
  } catch (_) {}

  if (!event) {
    notFound();
  }

  return (
    <PublicLayout settings={settings}>
      <LiveEventDetailClient event={event} />
    </PublicLayout>
  );
}
