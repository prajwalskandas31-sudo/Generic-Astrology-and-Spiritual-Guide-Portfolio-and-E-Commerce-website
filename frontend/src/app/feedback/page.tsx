import { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import ClientFeedbackSection from "@/components/ClientFeedbackSection";
import { getSettings } from "@/lib/api-client";

export const metadata: Metadata = {
  title: "Client Feedback & Reviews | Veda Brahma Shri Pradeep Nadig",
  description:
    "Read authentic reviews, ratings, and testimonials from devotees and clients for Griha Pravesha, Ganapathi Homa, Vedic Astrology consultations, and Chanting workshops conducted by Shri Pradeep Nadig in Bengaluru.",
  alternates: {
    canonical: "https://pradeepnadig.in/feedback",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FeedbackPage() {
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  return (
    <PublicLayout settings={settings}>
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-amber-950 via-amber-900 to-orange-950 text-white py-14 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-500/30">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            Devotee Testimonials &amp; Public Ratings
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 tracking-tight">
            Client Feedback &amp; Review Portal
          </h1>
          <p className="text-sm sm:text-base text-amber-200/90 leading-relaxed font-light max-w-2xl mx-auto">
            Explore authentic experiences shared by families, house-owners, students, and devotees who have engaged Shri Pradeep Nadig for sacred purohit rituals, horoscope readings, and Vedic workshops.
          </p>
        </div>
      </section>

      {/* Main Feedback Showcase Section */}
      <ClientFeedbackSection showAllLink={false} />
    </PublicLayout>
  );
}
