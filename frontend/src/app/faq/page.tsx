import PublicLayout from "@/components/PublicLayout";
import { getFAQ, getSettings } from "@/lib/api-client";
import FAQClient from "@/components/FAQClient";
import { FAQItem } from "@/types";

export const revalidate = 60;

export default async function FAQPage() {
  let settings: Record<string, any> = {};
  let faqList: FAQItem[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    faqList = await getFAQ();
  } catch (_) {}

  return (
    <PublicLayout settings={settings}>
      {/* Header */}
      <section className="bg-gradient-to-b from-amber-950 via-slate-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-900/40">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            Answers &amp; Clarity
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-50">
            Frequently Asked Questions
          </h1>
          <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Find answers regarding homam preparations, horoscope analysis requirements, workshop schedules, and enquiry procedures.
          </p>
        </div>
      </section>

      {/* FAQ Client */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[50vh]">
        <div className="max-w-4xl mx-auto">
          <FAQClient faqList={faqList} />
        </div>
      </section>
    </PublicLayout>
  );
}
