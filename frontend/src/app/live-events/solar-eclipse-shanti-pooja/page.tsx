import PublicLayout from "@/components/PublicLayout";
import LiveEventDetailClient from "../LiveEventDetailClient";
import { getSettings, getLiveEventBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const event: any = await getLiveEventBySlug("solar-eclipse-shanti-pooja").catch(() => null);
  const title = event?.seo_title || "Solar Eclipse Shanti Pooja | Shri Pradeep Nadig";
  const description = event?.seo_description || event?.short_description || "Participate in Surya Grahana Shanti Pooja and Veda Parayana.";
  const url = "https://pradeepnadig.in/live-events/solar-eclipse-shanti-pooja";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export const dynamic = "force-dynamic";

export default async function SolarEclipseShantiPoojaPage() {
  const settings = await getSettings().catch(() => ({}));
  const event = await getLiveEventBySlug("solar-eclipse-shanti-pooja").catch(() => null);

  if (!event) notFound();

  return (
    <PublicLayout settings={settings}>
      <LiveEventDetailClient event={event} />
    </PublicLayout>
  );
}
