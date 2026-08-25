import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import { getFAQ, getSettings } from "@/lib/api-client";
import FAQClient from "@/components/FAQClient";
import { FAQItem } from "@/types";
import { buildFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Vedic Rituals & Astrology FAQs | Veda Brahma Shri Pradeep Nadig",
  description:
    "Explore answers regarding authentic Ganapathi & Navagraha Homas, Vedic horoscope readings, Prashna astrology, live event Sankalpas, and chanting classes in Bengaluru.",
  keywords: [
    "Vedic Rituals FAQ",
    "Astrology Consultation Questions",
    "Ganapathi Homa Procedure",
    "Navagraha Homa Materials",
    "Prashna Astrology FAQ",
    "Online Sankalpa Live Streaming",
    "Pradeep Nadig FAQ",
    "Purohit Bengaluru FAQ",
  ],
  alternates: {
    canonical: "https://pradeepnadig.in/faq",
  },
  openGraph: {
    title: "Vedic Rituals & Astrology FAQs | Veda Brahma Shri Pradeep Nadig",
    description:
      "Find comprehensive answers to common questions about homa preparations, horoscope analysis requirements, workshop schedules, and booking procedures.",
    url: "https://pradeepnadig.in/faq",
  },
};

export const revalidate = 60;

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 1,
    category: "Pooja & Homa",
    question: "What is the procedure to book a Homa or Pooja with Shri Pradeep Nadig?",
    answer: "You can send an enquiry directly via our website by selecting the desired Homa or Pooja service. Our team will verify auspicious Tithis and Muhurthas based on your birth details and contact you within 24 hours to confirm date, venue, and samagri requirements."
  },
  {
    id: 2,
    category: "Pooja & Homa",
    question: "Are all ritual materials and Samagri provided by the Purohit?",
    answer: "Yes, Veda Brahma Shri Pradeep Nadig arranges all sacred Veda Samithu wood, pure desi cow ghee, dravya powders, dry coconut, modaka, and ritual samagri required for authentic Homas in Bengaluru. Clients only need to provide basic household items like fresh flowers and fruits."
  },
  {
    id: 3,
    category: "Pooja & Homa",
    question: "Can Homas be performed at our home or business premises in Bengaluru?",
    answer: "Yes, all Homas (including Ganapathi Homa, Navagraha Homa, Vastu Homa, Mrityunjaya Homa, and Durga Homa) can be conducted at your personal residence, newly constructed home, apartment, commercial office, or chosen venue in Bengaluru."
  },
  {
    id: 4,
    category: "Astrology & Consultations",
    question: "What birth details are required for a Vedic Astrology Consultation?",
    answer: "For an accurate horoscope (Janma Kundali) analysis, you need to provide your Date of Birth, exact Time of Birth, and Place of Birth. If exact birth time is unavailable, a Prashna Marga (Horary Astrology) consultation can be performed."
  },
  {
    id: 5,
    category: "Astrology & Consultations",
    question: "How are online video astrology consultations conducted for international clients?",
    answer: "Online consultations are conducted via HD Zoom or WhatsApp Video call. Shri Pradeep Nadig prepares your digital birth chart in advance, reviews Dasha-Bhukti transits, and guides you through remedies and practical solutions."
  },
  {
    id: 6,
    category: "Astrology & Consultations",
    question: "What is Prashna Marga Astrology and when is it recommended?",
    answer: "Prashna Marga is an ancient Vedic branch of horary astrology that analyzes the planetary position at the exact moment a question is posed. It is ideal for immediate clarity regarding lost items, health decisions, property purchases, career changes, or when birth time is unknown."
  },
  {
    id: 7,
    category: "Live Events & Sankalpa",
    question: "How does remote Sankalpa work for Live Events like Mahashivaratri or Eclipse Pooja?",
    answer: "When you register for a remote Sankalpa, your Name, Gothra, Nakshatra, and specific prayer intentions are solemnly uttered during the main ritual initiation by Shri Pradeep Nadig. The live stream link is emailed/whatsapped to you so you can participate from anywhere worldwide."
  },
  {
    id: 8,
    category: "Live Events & Sankalpa",
    question: "Will sacred Prasadam be dispatched after live events?",
    answer: "Yes, sacred Kumkuma, Vibhuthi, Raksha Sutra thread, and energised prasadam coins are packed hygienically and dispatched to your registered mailing address following major live events and Mahahomas."
  },
  {
    id: 9,
    category: "Classes & Workshops",
    question: "Are prerequisites required to join the Sacred Vedic Chanting Course?",
    answer: "No prior knowledge of Sanskrit is necessary. The foundation course starts from basic pronunciation rules (Sanskrit Varna Chintane), Swara accents (Udatta, Anudatta, Svarita), and step-by-step recitation of Suktas and Stotrams."
  },
  {
    id: 10,
    category: "Booking & Logistics",
    question: "What is the advance booking window recommended for Griha Pravesha Vastu Homa?",
    answer: "We recommend booking 2 to 4 weeks in advance, especially during major auspicious Muhurtha seasons (such as Vastu Puja days and Akshaya Tritiya), to ensure date availability and custom Muhurtha calculation."
  },
  {
    id: 11,
    category: "Local Purohit Services",
    question: "How do I find an authentic Kannada Purohit near me in Bengaluru?",
    answer: "Veda Brahma Shri Pradeep Nadig is a highly experienced Kannada Purohit and Vedic Scholar based in Asharaya Layout, Vaderahalli, Bengaluru (Pin: 560097). He conducts traditional Kannada Vadhyar rituals, Griha Pravesha, Ganapathi Homa, Vastu Homa, and Navagraha Homas across Bengaluru including Yelahanka, Vidyaranyapura, Hebbal, Sahakara Nagar, Malleswaram, and Jayanagar."
  },
  {
    id: 12,
    category: "Local Purohit Services",
    question: "Is a Vedic Pandit near me available for Griha Pravesha and Vastu Homa at home?",
    answer: "Yes! Shri Pradeep Nadig and his trained team of Vedic Pandits travel directly to your residence, newly built apartment, or office in Bengaluru for Griha Pravesha, Vastu Purusha Homa, and Navagraha Shanthi. All sacred Samagri and Veda Samithu are arranged by the Purohit."
  },
  {
    id: 13,
    category: "Local Purohit Services",
    question: "How can I locate Veda Brahma Shri Pradeep Nadig on Google Maps?",
    answer: "You can search for 'Pradeep Nadig Asharaya layout Vaderahalli' on Google Maps or open our official Google Maps location link: https://maps.google.com/?q=Pradeep+Nadig+Asharaya+layout+Vaderahalli+KG+Vaderahalli+Karnataka+560097. In-person consultations and prayer bookings are held at our center in Vaderahalli, North Bengaluru."
  },
  {
    id: 14,
    category: "Astrology & Consultations",
    question: "Can I book a Kannada Astrologer near me for in-person birth chart reading?",
    answer: "Yes, Shri Pradeep Nadig offers in-person Vedic astrology consultations at Shaankari Kendra in Bengaluru as well as online HD Zoom video calls for outstation and overseas clients. Birth chart (Janma Kundali) reading, Dasha predictions, and practical Parihara remedies are provided."
  },
  {
    id: 15,
    category: "Local Purohit Services",
    question: "Which areas in Bangalore are covered by Kannada Vadhyar Shri Pradeep Nadig for Pooja services?",
    answer: "Shri Pradeep Nadig provides authentic Purohit and Vadhyar services across all Bangalore localities including Vaderahalli, Yelahanka, Vidyaranyapura, Hebbal, Sahakara Nagar, Rajajinagar, Malleswaram, Indiranagar, Koramangala, Whitefield, HSR Layout, and Jayanagar."
  }
];

export default async function FAQPage() {
  let settings: Record<string, any> = {};
  let apiFaqs: FAQItem[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    apiFaqs = await getFAQ();
  } catch (_) {}

  // Smart Merge: ensure all 15 FAQs are present
  const mapByQ = new Map<string, FAQItem>();
  for (const f of DEFAULT_FAQS) {
    mapByQ.set(f.question, f);
  }
  for (const f of apiFaqs) {
    mapByQ.set(f.question, f);
  }
  const finalFaqs = Array.from(mapByQ.values());
  const jsonLd = buildFAQSchema(finalFaqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <PublicLayout settings={settings}>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 border-b border-amber-200/80 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-200/80 border border-amber-400/50 text-amber-900 text-xs font-semibold uppercase tracking-widest">
            Vedic Answers &amp; Clarity
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-950">
            Frequently Asked Questions
          </h1>
          <p className="text-amber-900/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Explore authentic guidance regarding homam preparations, horoscope analysis requirements, online live event sankalpas, and chanting classes.
          </p>
        </div>
      </section>

      {/* FAQ Client */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[50vh]">
        <div className="max-w-4xl mx-auto">
          <FAQClient faqList={finalFaqs} />
        </div>
      </section>
    </PublicLayout>
  );
}
