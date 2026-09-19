import LegalLayout from "@/components/LegalLayout";
import { getSettings } from "@/lib/api-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy | Veda Brahma Shri Pradeep Nadig",
  description:
    "Cancellation policy for Vedic consultations, homa services, and chanting workshops.",
  alternates: {
    canonical: "https://pradeepnadig.in/cancellation-policy",
  },
};

export const revalidate = 300;

export default async function CancellationPolicyPage() {
  let settings: Record<string, any> = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const content =
    settings.cancellation_policy ||
    "Consultations and ritual bookings can be rescheduled or cancelled up to 24 hours prior to the scheduled slot by contacting us directly on WhatsApp.";

  return (
    <LegalLayout title="Cancellation Policy">
      <p>{content}</p>
      <h2 className="text-xl font-bold font-serif text-slate-900 mt-6 mb-2">1. Rescheduling Appointments</h2>
      <p>
        To request a slot change for your consultation or homa ritual, please notify us via WhatsApp at least 24 hours in advance so we can update the calendar event.
      </p>
    </LegalLayout>
  );
}
