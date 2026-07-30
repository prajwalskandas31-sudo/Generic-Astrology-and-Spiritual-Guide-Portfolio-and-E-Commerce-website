import LegalLayout from "@/components/LegalLayout";
import { getSettings } from "@/lib/api-client";

export const revalidate = 300;

export default async function RefundPolicyPage() {
  let settings: Record<string, any> = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const content =
    settings.refund_policy ||
    "Workshop fee refunds are subject to our refund timeline policy. Refund requests submitted prior to the registration deadline will be processed within 5 to 7 business days.";

  return (
    <LegalLayout title="Refund Policy">
      <p>{content}</p>
      <h2 className="text-xl font-bold font-serif text-slate-900 mt-6 mb-2">1. Workshop Cancellations &amp; Refunds</h2>
      <p>
        If a workshop is rescheduled or cancelled by the organizer, a 100% full refund will be issued to all registered participants automatically via the original payment method.
      </p>
      <h2 className="text-xl font-bold font-serif text-slate-900 mt-6 mb-2">2. Processing Time</h2>
      <p>
        Approved refunds are routed via Razorpay back to your original source account within 5 to 7 business days.
      </p>
    </LegalLayout>
  );
}
