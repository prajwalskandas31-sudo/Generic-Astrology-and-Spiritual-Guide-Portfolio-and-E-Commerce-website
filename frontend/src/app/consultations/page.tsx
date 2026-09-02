import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import { getOfferings, getSettings } from "@/lib/api-client";
import ServicesClient from "@/components/ServicesClient";
import { Offering } from "@/types";

export const metadata: Metadata = {
  title: "Vedic Astrology & Consultation Services in Bangalore | Pradeep Nadig",
  description:
    "Book 1-on-1 Vedic Astrology consultation, birth chart (Janma Kundali) reading, Kundali matching, career guidance, and remedies with Veda Brahma Shri Pradeep Nadig in Bangalore or online.",
  keywords: [
    "Vedic Astrology Consultation",
    "Best Astrologer Bangalore",
    "Kundali Matching Bengaluru",
    "Horoscope Reading Pradeep Nadig",
    "Jyotish Consultation Online",
    "Kannada Astrologer near me",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/consultations",
  },
  openGraph: {
    title: "Vedic Astrology & Consultation Services | Shri Pradeep Nadig",
    description:
      "Personalized 1-on-1 horoscope analysis, Dasha predictions, and authentic Vedic remedies by Veda Brahma Shri Pradeep Nadig in Bangalore and online.",
    url: "https://pradeepnadig.in/consultations",
    siteName: "Pradeep Nadig",
    images: [{ url: "/images/services/vedic-astrology-consultation.jpg" }],
  },
};

export const revalidate = 60;

export default async function ConsultationsPage() {
  let settings: Record<string, any> = {};
  let offerings: Offering[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offerings = await getOfferings();
  } catch (_) {}

  const consultations = offerings.filter((o) => o.type === "Consultation");
  const services = offerings.filter((o) => o.type === "Service");
  const poojas = offerings.filter((o) => o.type === "Pooja");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://pradeepnadig.in/consultations#service",
        name: "Vedic Astrology & Horoscope Consultation",
        serviceType: "Astrological Consultation",
        description:
          "Personalized 1-on-1 Janma Kundali (birth chart) reading, Dasha period assessment, career and marriage compatibility guidance, and authentic Vedic remedies.",
        provider: {
          "@type": "Person",
          name: "Pradeep Nadig",
          jobTitle: "Vedic Scholar & Astrologer",
          url: "https://pradeepnadig.in",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Bengaluru, Karnataka, India",
        },
        url: "https://pradeepnadig.in/consultations",
      },
    ],
  };

  return (
    <PublicLayout settings={settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page Header */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 border-b border-amber-200/80 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-200/80 border border-amber-400/50 text-amber-900 text-xs font-semibold uppercase tracking-widest">
            Vedic Astrology &amp; Horoscope Consultations
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-950">
            Astrology &amp; Guidance Consultations
          </h1>
          <p className="text-amber-900/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Book personalized 1-on-1 horoscope readings, birth chart decoding, Kundali matching, and authentic Vedic remedial guidance by Veda Brahma Shri Pradeep Nadig.
          </p>
        </div>
      </section>

      {/* Consultations List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100 min-h-[70vh]">
        <ServicesClient
          services={services}
          poojas={poojas}
          consultations={consultations}
        />
      </section>
    </PublicLayout>
  );
}
