import PublicLayout from "@/components/PublicLayout";
import LiveEventDetailClient from "../LiveEventDetailClient";
import { getSettings, getLiveEventBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const event: any = await getLiveEventBySlug("monthly-pradosham-rudrabhishekam").catch(() => null);
  const title = event?.seo_title || "Monthly Pradosham Rudrabhishekam | Shri Pradeep Nadig";
  const description = event?.seo_description || event?.short_description || "Participate in Monthly Pradosham Rudrabhishekam ritual and live stream.";
  const url = "https://pradeepnadig.in/live-events/monthly-pradosham-rudrabhishekam";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export const dynamic = "force-dynamic";

export default async function MonthlyPradoshamRudrabhishekamPage() {
  const settings = await getSettings().catch(() => ({}));
  const event = await getLiveEventBySlug("monthly-pradosham-rudrabhishekam").catch(() => null);

  if (!event) notFound();

  return (
    <PublicLayout settings={settings}>
      <LiveEventDetailClient event={event} />
    </PublicLayout>
  );
}
