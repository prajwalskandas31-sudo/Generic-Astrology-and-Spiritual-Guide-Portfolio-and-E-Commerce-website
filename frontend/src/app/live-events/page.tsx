import PublicLayout from "@/components/PublicLayout";
import LiveEventsClient from "./LiveEventsClient";
import { getSettings, getLiveEvents } from "@/lib/api-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LiveEventsPage() {
  let settings: Record<string, any> = {};
  let events: import("@/types").LiveEvent[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    events = await getLiveEvents();
  } catch (_) {}

  return (
    <PublicLayout settings={settings}>
      <LiveEventsClient initialEvents={events} />
    </PublicLayout>
  );
}
