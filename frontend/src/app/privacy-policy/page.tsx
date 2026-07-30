import LegalLayout from "@/components/LegalLayout";
import { getSettings } from "@/lib/api-client";

export const revalidate = 300;

export default async function PrivacyPolicyPage() {
  let settings: Record<string, any> = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const content =
    settings.privacy_policy ||
    "We respect your privacy. All personal information collected through enquiry and workshop registration forms (including your name, phone number, email address, and delivery address) is used strictly for service delivery, WhatsApp communication, and booking confirmation. We do not sell or share your data with third parties.";

  return (
    <LegalLayout title="Privacy Policy">
      <p>{content}</p>
      <h2 className="text-xl font-bold font-serif text-slate-900 mt-6 mb-2">1. Information Collection</h2>
      <p>
        When submitting an enquiry, requesting a service, or registering for a Vedic workshop, we collect necessary contact information to fulfill your request and provide timely updates via WhatsApp.
      </p>
      <h2 className="text-xl font-bold font-serif text-slate-900 mt-6 mb-2">2. Data Security</h2>
      <p>
        We employ industry-standard encryption and security measures. Payment transactions are processed securely through Razorpay; no credit card or banking details are stored on our servers.
      </p>
    </LegalLayout>
  );
}
