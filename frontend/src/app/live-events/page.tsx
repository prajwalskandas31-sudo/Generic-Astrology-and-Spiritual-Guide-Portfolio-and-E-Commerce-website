import PublicLayout from "@/components/PublicLayout";
import LiveEventsClient from "./LiveEventsClient";
import { getSettings, getLiveEvents } from "@/lib/api-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Live Events & Parayanas | Shri Pradeep Nadig",
  description:
    "Participate in live stream Vedic rituals, Mahashivaratri Pujas, Pradosham Rudrabhishekam, and Chandi Homas in Bengaluru.",
  alternates: {
    canonical: "https://pradeepnadig.in/live-events",
  },
};

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
