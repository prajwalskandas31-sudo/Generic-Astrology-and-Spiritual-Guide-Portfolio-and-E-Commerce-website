import PublicLayout from "@/components/PublicLayout";
import LiveEventDetailClient from "../LiveEventDetailClient";
import { getSettings, getLiveEventBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const event: any = await getLiveEventBySlug("navratri-chandi-homa-live").catch(() => null);
  const title = event?.seo_title || "Navratri Chandi Homa Live Stream | Shri Pradeep Nadig";
  const description = event?.seo_description || event?.short_description || "Participate in Navratri Maha Chandi Homa live stream and ritual.";
  const url = "https://pradeepnadig.in/live-events/navratri-chandi-homa-live";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export const dynamic = "force-dynamic";

export default async function NavratriChandiHomaLivePage() {
  const settings = await getSettings().catch(() => ({}));
  const event = await getLiveEventBySlug("navratri-chandi-homa-live").catch(() => null);

  if (!event) notFound();

  return (
    <PublicLayout settings={settings}>
      <LiveEventDetailClient event={event} />
    </PublicLayout>
  );
}
