import LegalLayout from "@/components/LegalLayout";
import { getSettings } from "@/lib/api-client";

export const revalidate = 300;

export default async function CookiePolicyPage() {
  let settings: Record<string, any> = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const content =
    settings.cookie_policy ||
    "This website uses essential session cookies to enhance browsing performance and manage secure admin sessions.";

  return (
    <LegalLayout title="Cookie Policy">
      <p>{content}</p>
      <h2 className="text-xl font-bold font-serif text-slate-900 mt-6 mb-2">1. Essential Cookies</h2>
      <p>
        We use minimal, strictly necessary cookies required for user navigation, form validation, and admin authentication. We do not use third-party tracking cookies.
      </p>
    </LegalLayout>
  );
}
