import PublicLayout from "@/components/PublicLayout";
import LiveEventDetailClient from "../LiveEventDetailClient";
import { getSettings, getLiveEventBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const event: any = await getLiveEventBySlug("mahashivaratri-grand-night-2026").catch(() => null);
  const title = event?.seo_title || "Mahashivaratri Grand Night 2026 | Shri Pradeep Nadig";
  const description = event?.seo_description || event?.short_description || "Participate in 4 Prahara Ekadasa Rudrabhishekam on Mahashivaratri.";
  const url = "https://pradeepnadig.in/live-events/mahashivaratri-grand-night-2026";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export const dynamic = "force-dynamic";

export default async function MahashivaratriGrandNightPage() {
  const settings = await getSettings().catch(() => ({}));
  const event = await getLiveEventBySlug("mahashivaratri-grand-night-2026").catch(() => null);

  if (!event) notFound();

  return (
    <PublicLayout settings={settings}>
      <LiveEventDetailClient event={event} />
    </PublicLayout>
  );
}
