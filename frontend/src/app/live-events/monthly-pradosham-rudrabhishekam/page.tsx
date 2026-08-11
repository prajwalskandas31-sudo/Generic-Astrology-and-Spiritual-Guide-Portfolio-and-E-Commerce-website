import PublicLayout from "@/components/PublicLayout";
import LiveEventDetailClient from "../LiveEventDetailClient";
import { getSettings, getLiveEventBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";

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
