import LegalLayout from "@/components/LegalLayout";
import { getSettings } from "@/lib/api-client";

export const revalidate = 300;

export default async function TermsConditionsPage() {
  let settings: Record<string, any> = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const content =
    settings.terms_conditions ||
    "By accessing this website and registering for workshops or requesting consultation services, you agree to comply with our terms and guidelines.";

  return (
    <LegalLayout title="Terms & Conditions">
      <p>{content}</p>
      <h2 className="text-xl font-bold font-serif text-slate-900 mt-6 mb-2">1. Scope of Services</h2>
      <p>
        Services, home rituals, and astrological consultations offered by Veda Brahma Shri Pradeep Nadig are performed with traditional Vedic authenticity. Consultation advice is intended for guidance purposes.
      </p>
      <h2 className="text-xl font-bold font-serif text-slate-900 mt-6 mb-2">2. Workshop Registrations</h2>
      <p>
        Workshop seats are allocated on a first-come, first-served basis upon successful payment verification. Full address details are mandatory during registration.
      </p>
    </LegalLayout>
  );
}
