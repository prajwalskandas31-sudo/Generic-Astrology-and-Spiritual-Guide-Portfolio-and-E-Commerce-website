import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import { getSettings } from "@/lib/api-client";
import { BANGALORE_LOCATIONS } from "@/lib/locations-data";
import { MapPin, Sparkles, CheckCircle2, ArrowRight, Phone, MessageSquare } from "lucide-react";
import { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Kannada Purohit & Vedic Pandit Services across Bangalore | Areas Served",
  description:
    "Explore authentic Kannada Purohit, Vadhyar, and Vedic Astrologer services across Bengaluru neighborhoods: Yelahanka, Vidyaranyapura, Hebbal, Whitefield, Malleswaram, Jayanagar & more. Led by Veda Brahma Shri Pradeep Nadig.",
  alternates: {
    canonical: "https://pradeepnadig.in/locations",
  },
  keywords: [
    "Kannada Purohit near me",
    "Kannada Purohit in Bangalore",
    "Purohit in Yelahanka",
    "Kannada Vadhyar Vidyaranyapura",
    "Griha Pravesha Pandit Whitefield",
    "Vedic Astrologer Malleswaram",
    "Pooja services Jayanagar",
    "Purohit Hebbal",
    "Bangalore Vedic Priest",
  ],
};

export default async function LocationsIndexPage() {
  let settings: Record<string, any> = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", item: "https://pradeepnadig.in" },
    { name: "Areas Served", item: "https://pradeepnadig.in/locations" },
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbs,
      {
        "@type": "ItemList",
        name: "Bangalore Localities Served by Veda Brahma Shri Pradeep Nadig",
        description: "List of key Bengaluru areas where authentic Kannada Purohit and Vedic rituals are conducted.",
        itemListElement: BANGALORE_LOCATIONS.map((loc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: loc.name,
          url: `https://pradeepnadig.in/locations/${loc.slug}`,
        })),
      },
    ],
  };

  return (
    <PublicLayout settings={settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-700/40">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Bengaluru Service Coverage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-50 tracking-tight">
            Kannada Purohit &amp; Vedic Services Across Bangalore
          </h1>
          <p className="text-sm sm:text-base text-amber-100/90 font-serif italic max-w-2xl mx-auto">
            ಬೆಂಗಳೂರಿನ ಎಲ್ಲಾ ಪ್ರಮುಖ ಬಡಾವಣೆಗಳಲ್ಲಿ ಅಧಿಕೃತ ಕನ್ನಡ ವೈದಿಕ ಪುರೋಹಿತ ಸೇವೆಗಳು ಮತ್ತು ಜ್ಯೋತಿಷ್ಯ ಮಾರ್ಗದರ್ಶನ
          </p>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-3xl mx-auto leading-relaxed pt-2">
            Veda Brahma Shri Pradeep Nadig travels directly to your residence, newly constructed home, or business venue across Bengaluru to perform traditional Griha Pravesha, Ganapathi Homa, Vastu Shanthi, and specialized Poojas.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BANGALORE_LOCATIONS.map((loc) => (
            <div
              key={loc.slug}
              className="bg-white rounded-2xl border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Image banner */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={loc.heroImage}
                  alt={loc.headline}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                    {loc.subRegion}
                  </span>
                  <h2 className="text-xl font-serif font-bold text-white drop-shadow-sm">
                    {loc.name}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs font-serif font-semibold text-amber-900 italic">
                    {loc.kannadaHeadline}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {loc.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                      Neighborhoods Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.keyNeighborhoods.slice(0, 4).map((area) => (
                        <span
                          key={area}
                          className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-md text-[11px]"
                        >
                          {area}
                        </span>
                      ))}
                      {loc.keyNeighborhoods.length > 4 && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px]">
                          +{loc.keyNeighborhoods.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-amber-900 hover:bg-amber-950 text-amber-100 rounded-xl text-xs font-bold transition-colors shadow-sm group-hover:translate-x-0.5"
                  >
                    <span>View {loc.name} Services &amp; FAQs</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centralized Bangalore Booking CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 rounded-3xl p-8 sm:p-12 border border-amber-300/80 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="px-3 py-1 bg-amber-200/70 text-amber-900 font-bold text-xs rounded-full uppercase tracking-wider">
              Serving All Bengaluru Localities
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
              Is Your Locality Not Listed Above?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Veda Brahma Shri Pradeep Nadig conducts homas and provides astrological consultations across the entire Greater Bengaluru metropolitan region and worldwide via online video Sankalpa. Contact us directly to book your preferred date.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="https://wa.me/919844042068?text=Namaskara%20Guruji%2C%20I%20am%20looking%20for%20Kannada%20Purohit%20services%20in%20Bangalore."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Guruji</span>
            </a>
            <a
              href="tel:+919844042068"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-900 hover:bg-amber-950 text-amber-100 rounded-xl text-sm font-bold shadow-md transition-all"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call +91 98440 42068</span>
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
