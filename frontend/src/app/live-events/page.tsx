import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://pradeepnadig.in/events",
  },
};

/**
 * /live-events parent route redirects to /events.
 * Individual event pages at /live-events/[slug] still serve content.
 * The redirect in next.config.ts handles this at the edge,
 * but this acts as a fallback.
 */
export default function LiveEventsPage() {
  redirect("/events");
}
