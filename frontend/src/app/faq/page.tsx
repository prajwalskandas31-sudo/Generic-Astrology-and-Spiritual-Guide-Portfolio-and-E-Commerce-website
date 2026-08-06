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
      <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 border-b border-amber-200/80 py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-200/80">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-200/80 border border-amber-400/50 text-amber-900 text-xs font-semibold uppercase tracking-widest">
            Answers &amp; Clarity
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-950">
            Frequently Asked Questions
          </h1>
          <p className="text-amber-900/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
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
