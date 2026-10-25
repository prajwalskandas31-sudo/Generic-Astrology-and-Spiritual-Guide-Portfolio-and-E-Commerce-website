import PublicLayout from "@/components/PublicLayout";
import { getSettings } from "@/lib/api-client";
import { BANGALORE_LOCATIONS, getLocalityBySlug } from "@/lib/locations-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Clock,
  Star,
} from "lucide-react";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return BANGALORE_LOCATIONS.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocalityBySlug(slug);
  if (!loc) {
    return {
      title: "Locality | Veda Brahma Shri Pradeep Nadig",
    };
  }

  const url = `https://pradeepnadig.in/locations/${slug}`;

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    keywords: [
      `Kannada Purohit in ${loc.name}`,
      `Kannada Purohit near me ${loc.name}`,
      `Griha Pravesha Pandit ${loc.name}`,
      `Ganapathi Homa ${loc.name}`,
      `Vastu Homa ${loc.name}`,
      `Vedic Astrologer ${loc.name}`,
      `Purohit ${loc.name} Bangalore`,
      `Pradeep Nadig ${loc.name}`,
      ...loc.keyNeighborhoods.map((n) => `Purohit in ${n}`),
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: loc.metaTitle,
      description: loc.metaDescription,
      url,
      siteName: "Pradeep Nadig",
      images: [{ url: loc.heroImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: loc.metaTitle,
      description: loc.metaDescription,
      images: [loc.heroImage],
    },
  };
}

export default async function LocalityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocalityBySlug(slug);

  if (!loc) {
    notFound();
  }

  let settings: Record<string, any> = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", item: "https://pradeepnadig.in" },
    { name: "Areas Served", item: "https://pradeepnadig.in/locations" },
    { name: loc.name, item: `https://pradeepnadig.in/locations/${loc.slug}` },
  ]);

  const faqSchema = loc.faqs && loc.faqs.length > 0 ? buildFAQSchema(loc.faqs) : null;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `https://pradeepnadig.in/locations/${loc.slug}#localbusiness`,
    name: `Veda Brahma Shri Pradeep Nadig - Kannada Purohit in ${loc.name}`,
    image: "https://pradeepnadig.in/pradeep-nadig.jpg",
    url: `https://pradeepnadig.in/locations/${loc.slug}`,
    telephone: "+919844042068",
    priceRange: "₹₹",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.95",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Asharaya layout, Vaderahalli",
      addressLocality: loc.name,
      addressRegion: "Karnataka",
      postalCode: loc.postalCodes[0] || "560097",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    areaServed: loc.keyNeighborhoods.map((n) => ({
      "@type": "AdministrativeArea",
      name: `${n}, Bengaluru`,
    })),
    knowsAbout: [
      `Kannada Purohit in ${loc.name}`,
      `Griha Pravesha Pandit in ${loc.name}`,
      `Ganapathi Homa Priest ${loc.name}`,
      `Vastu Homa in ${loc.name}`,
      `Vedic Astrologer ${loc.name}`,
      "Krishna Yajurveda Rituals",
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbs, localBusinessSchema, ...(faqSchema ? [faqSchema] : [])],
  };

  const whatsappMessage = encodeURIComponent(
    `Namaskara Guruji, I am looking for Kannada Purohit / Vedic services in ${loc.name}, Bangalore.`
  );

  return (
    <PublicLayout settings={settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-amber-100/50 border-b border-amber-200/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-amber-900 font-medium">
          <Link href="/" className="hover:text-amber-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
          <Link href="/locations" className="hover:text-amber-950 transition-colors">
            Areas Served
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-amber-950 font-bold">{loc.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-950 via-amber-900 to-orange-950 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
          style={{ backgroundImage: `url('${loc.heroImage}')` }}
        />
        <div className="relative max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Bengaluru Service Area • {loc.subRegion}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-50 tracking-tight leading-tight">
            {loc.headline}
          </h1>

          <p className="text-base sm:text-lg text-amber-200 font-serif italic">
            {loc.kannadaHeadline}
          </p>

          <p className="text-xs sm:text-sm text-amber-100/80 max-w-3xl leading-relaxed pt-2">
            {loc.description}
          </p>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (8 cols): Local Details & Offerings */}
          <div className="lg:col-span-8 space-y-12">
            {/* Bilingual Kannada Highlight Box */}
            <div className="bg-amber-50/80 rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-base">
                <Sparkles className="w-5 h-5 text-amber-700" />
                <span>ಶಾಸ್ತ್ರೋಕ್ತ ವೈದಿಕ ಸೇವೆಗಳು • {loc.name}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif">
                {loc.kannadaSummary}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                ವೇದ ಬ್ರಹ್ಮ ಶ್ರೀ ಪ್ರದೀಪ್ ನಾಡಿಗ್ ಅವರ ನೇತೃತ್ವದಲ್ಲಿ ಶುದ್ಧ ಸಂಸ್ಕೃತ ಮಂತ್ರೋಚ್ಚಾರಣೆ, ವೈದಿಕ ವಿಧಿ-ವಿಧಾನ ಹಾಗೂ ಸಂಪೂರ್ಣ ಪೂಜಾ ಸಾಮಗ್ರಿಗಳೊಂದಿಗೆ ಎಲ್ಲಾ ಶುಭ ಸಮಾರಂಭಗಳನ್ನು ನೆರವೇರಿಸಲಾಗುತ್ತದೆ.
              </p>
            </div>

            {/* Neighborhoods Covered */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-700" />
                <span>Neighborhoods &amp; Societies Covered in {loc.name}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {loc.keyNeighborhoods.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-xs font-medium text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 italic pt-1">
                * Note: {loc.travelInfo}
              </p>
            </div>

            {/* Popular Homas & Rituals in this Locality */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Most Requested Rituals in {loc.name}
                </h2>
                <p className="text-xs text-slate-600">
                  Select a ritual to review complete procedure details, Samagri lists, and booking guidelines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loc.recommendedHomas.map((homa) => (
                  <div
                    key={homa.slug}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        Vedic Ritual
                      </span>
                      <h3 className="text-base font-serif font-bold text-slate-900">
                        {homa.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {homa.reason}
                      </p>
                    </div>

                    <Link
                      href={`/services/${homa.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors pt-2 border-t border-slate-100"
                    >
                      <span>View Ritual Procedure &amp; Samagri</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Shri Pradeep Nadig */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-amber-200/80 space-y-4">
              <h2 className="text-xl font-serif font-bold text-amber-950">
                Why Families in {loc.name} Trust Shri Pradeep Nadig
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
                <div className="space-y-1.5">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Krishna Yajurvedic Authenticity
                  </span>
                  <p>
                    Trained in strict Vedic Samhita, Pada, and Krama traditions. Mantras are recited with immaculate uccharana and acoustic purity.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Apartment-Friendly Ritual Setup
                  </span>
                  <p>
                    Specialized smoke-efficient havankunds and measured Samithu oblations suitable for modern high-rise apartments and balconies in {loc.name}.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Punctual Brahma Muhurtha Arrival
                  </span>
                  <p>
                    Timely arrival for early-morning Sankalpa (4:30 AM to 6:30 AM), ensuring rituals align precisely with auspicious planetary Muhurthas.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    Meaning Explained in Kannada
                  </span>
                  <p>
                    Every prayer, sankalpa, and homa step is explained in clear Kannada and English so your entire family actively participates.
                  </p>
                </div>
              </div>
            </div>

            {/* Local FAQs */}
            {loc.faqs && loc.faqs.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Frequently Asked Questions for {loc.name}
                </h2>
                <div className="space-y-3">
                  {loc.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2"
                    >
                      <h3 className="font-semibold text-slate-900 text-sm">
                        {faq.question}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Booking & Contact Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-200/80 space-y-6">
              <div className="text-center space-y-2 pb-4 border-b border-slate-100">
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  Book Purohit in {loc.name}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Veda Brahma Shri Pradeep Nadig
                </h3>
                <p className="text-xs text-slate-500">
                  Authentic Kannada Purohit &amp; Astrologer
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="font-medium text-slate-500">Service Location:</span>
                  <span className="font-semibold text-slate-900">{loc.name}, Bengaluru</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="font-medium text-slate-500">Ritual Mode:</span>
                  <span className="font-semibold text-slate-900">At Your Residence</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="font-medium text-slate-500">Samagri Arrangement:</span>
                  <span className="font-semibold text-slate-900">Full Vedic Kit Provided</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="font-medium text-slate-500">Languages:</span>
                  <span className="font-semibold text-slate-900">Kannada, Sanskrit, English</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/919844042068?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Guruji for {loc.name}</span>
                </a>

                <a
                  href="tel:+919844042068"
                  className="w-full py-3 bg-amber-900 hover:bg-amber-950 text-amber-100 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span>Direct Call: +91 98440 42068</span>
                </a>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-normal">
                Direct inquiry with Guruji. No middleman agency. Full Muhurtha guidance provided.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
