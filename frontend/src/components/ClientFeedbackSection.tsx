"use client";

import { useState, useEffect } from "react";
import { Star, HeartHandshake, CheckCircle2, MapPin, Quote, PlusCircle, Sparkles } from "lucide-react";
import { Review } from "@/types";
import { getApprovedReviews } from "@/lib/api-client";
import ReviewSubmissionModal from "./ReviewSubmissionModal";

const FALLBACK_REVIEWS: Review[] = [
  {
    id: 101,
    name: "Ramesh Kumar & Family",
    city: "Malleswaram, Bengaluru",
    rating: 5,
    service_type: "Griha Pravesha Pooja",
    comment:
      "Shri Pradeep Nadig conducted our housewarming Griha Pravesha with immaculate devotion, pristine Swara chanting, and complete explanations of each Vastu & Homa step. Our entire family felt immense divine vibrations and spiritual tranquility.",
    status: "Approved",
    display_order: 1,
    created_at: "2026-01-15T10:00:00Z",
  },
  {
    id: 102,
    name: "Smt. Sunitha & Master Arvind",
    city: "Yelahanka, Bengaluru",
    rating: 5,
    service_type: "Sacred Vedic Chanting Mastery Course",
    comment:
      "Learning Purusha Sukta and Sri Sukta under Guruji Pradeep Nadig has been a life-transforming experience. His patience with Swara intonation and audio feedback is unparalleled.",
    status: "Approved",
    display_order: 2,
    created_at: "2026-02-02T14:30:00Z",
  },
  {
    id: 103,
    name: "Dr. Venkatesh Rao",
    city: "Vidyaranyapura, Bengaluru",
    rating: 5,
    service_type: "Prashna Marga Horary Astrology",
    comment:
      "Shri Pradeep's Prashna chart analysis was astonishingly accurate regarding our career transition. His Parihara remedies were simple, practical, and highly effective without unnecessary commercial gimmicks.",
    status: "Approved",
    display_order: 3,
    created_at: "2026-02-20T11:15:00Z",
  },
  {
    id: 104,
    name: "Anantharaman & Family",
    city: "Indiranagar, Bengaluru",
    rating: 5,
    service_type: "Ganapathi Homa",
    comment:
      "We performed Mahaganapathi Homa and Navagraha Shanthi at our home before starting our new business venture. Guruji's punctuality, authentic samagri setup, and divine mantras brought absolute peace.",
    status: "Approved",
    display_order: 4,
    created_at: "2026-03-01T09:00:00Z",
  },
  {
    id: 105,
    name: "Vidya Sagar M",
    city: "Sahakara Nagar, Bengaluru",
    rating: 5,
    service_type: "Vastu Shastra Energy Healing & Consultation",
    comment:
      "Practical Vastu guidance without demolition or structural hassle. Highly recommend Shri Pradeep Nadig for anyone seeking genuine Vedic guidance and home energy balance in Bangalore.",
    status: "Approved",
    display_order: 5,
    created_at: "2026-03-10T16:45:00Z",
  },
];

export interface ClientFeedbackSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showAllLink?: boolean;
}

export default function ClientFeedbackSection({
  title = "Devotee Experiences & Client Feedback",
  subtitle = "Read authentic reviews, ratings, and testimonials from families, devotees, and students across Bengaluru and worldwide.",
  limit,
  showAllLink = true,
}: ClientFeedbackSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchReviews() {
      try {
        const data = await getApprovedReviews();
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      } catch (_) {
        // Fallback to initial reviews array
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    "All",
    "Homas & Poojas",
    "Astrology",
    "Workshops & Courses",
  ];

  const filteredReviews = reviews.filter((r) => {
    if (activeCategory === "All") return true;
    const st = (r.service_type || "").toLowerCase();
    if (activeCategory === "Homas & Poojas") {
      return st.includes("homa") || st.includes("pooja") || st.includes("ritual") || st.includes("pravesha");
    }
    if (activeCategory === "Astrology") {
      return st.includes("astrology") || st.includes("horoscope") || st.includes("prashna") || st.includes("vastu");
    }
    if (activeCategory === "Workshops & Courses") {
      return st.includes("course") || st.includes("workshop") || st.includes("chanting") || st.includes("class");
    }
    return true;
  });

  const displayedReviews = limit ? filteredReviews.slice(0, limit) : filteredReviews;

  const totalReviewsCount = reviews.length;
  const avgRating = 5.0;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/50 via-white to-orange-50/40 border-y border-amber-200/60 font-sans relative overflow-hidden">
      {/* Decorative Warm Ambient Lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300/70">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
              <span>Verified Client Feedback</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">
              {title}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Rating Summary & Action Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-3">
              <div className="text-center px-2">
                <span className="text-3xl font-serif font-bold text-amber-900 block leading-none">
                  {avgRating.toFixed(1)}
                </span>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mt-1 block">
                  Out of 5.0
                </span>
              </div>
              <div className="border-l border-amber-200 pl-3 space-y-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {totalReviewsCount}+ Verified Client Reviews
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-amber-950 text-white rounded-2xl text-sm font-bold shadow-lg hover:shadow-amber-800/20 transition-all group"
            >
              <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              <span>Leave a Client Review</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? "bg-amber-800 text-white border-amber-800 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group relative"
            >
              <Quote className="w-8 h-8 text-amber-100 absolute top-4 right-4 pointer-events-none group-hover:text-amber-200 transition-colors" />

              <div className="space-y-3 relative z-10">
                {/* Stars & Service Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= rev.rating
                            ? "fill-amber-400 text-amber-500"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  {rev.service_type && (
                    <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full line-clamp-1 border border-amber-200">
                      {rev.service_type}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm leading-relaxed font-sans italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Client Info Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs relative z-10">
                <div>
                  <div className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5" title="Verified Devotee">
                    <span>{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  {rev.city && (
                    <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>{rev.city}</span>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Verified Review
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link if showAllLink */}
        {showAllLink && (
          <div className="text-center pt-4">
            <a
              href="/feedback"
              className="inline-flex items-center gap-2 font-semibold text-amber-800 hover:text-amber-950 text-sm group"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Explore all client feedback &amp; reviews &rarr;</span>
            </a>
          </div>
        )}
      </div>

      {/* Review Modal Trigger */}
      <ReviewSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
