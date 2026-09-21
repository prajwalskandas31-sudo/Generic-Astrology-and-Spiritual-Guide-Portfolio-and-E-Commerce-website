import PublicLayout from "@/components/PublicLayout";
import EventsClient from "./EventsClient";
import { getSettings, getLiveEvents } from "@/lib/api-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Management & Sacred Samskaras | Veda Brahma Shri Pradeep Nadig",
  description:
    "End-to-end Vedic Event Management in Bengaluru for Marriage (Maduve), Upanayana, Griha Pravesha, Seemantha, Naamakarana, Chowla, and live streaming Mahahomas.",
  alternates: {
    canonical: "https://pradeepnadig.in/events",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EventsPage() {
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
      <EventsClient initialEvents={events} />
    </PublicLayout>
  );
}
