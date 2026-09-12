import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import { getBlogs, getSettings } from "@/lib/api-client";
import Link from "next/link";
import { User, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { Blog } from "@/types";

export const metadata: Metadata = {
  title: "Spiritual Insights & Vedic Articles | Veda Brahma Shri Pradeep Nadig",
  description:
    "Explore comprehensive articles, guides, and spiritual wisdom on Vastu Shastra, Mahaganapathi Homa, Navagraha remedies, Vedic astrology, and mantra chanting by Shri Pradeep Nadig.",
  alternates: {
    canonical: "https://pradeepnadig.in/blogs",
  },
  openGraph: {
    title: "Spiritual Insights & Vedic Articles | Pradeep Nadig",
    description:
      "Comprehensive guides on Vastu Shastra, Vedic fire rituals, astrological guidance, and sacred traditions.",
    url: "https://pradeepnadig.in/blogs",
  },
};

export const revalidate = 60;

export default async function BlogsPage() {
  let settings: Record<string, any> = {};
  let blogsList: Blog[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    blogsList = await getBlogs();
  } catch (_) {}

  // Extract unique categories
  const categories = Array.from(new Set(blogsList.map((b) => b.category).filter(Boolean)));

  return (
    <PublicLayout settings={settings}>
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 border-b border-amber-200/80 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-200/80 border border-amber-400/50 text-amber-900 text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Vedic Wisdom &amp; Knowledge Repository
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-950">
            Spiritual Blogs &amp; Articles
          </h1>
          <p className="text-amber-900/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            In-depth guides on Vastu Shastra, Vedic fire rituals (Homas), planetary remedies, sacred poojas, and spiritual discipline by Veda Brahma Shri Pradeep Nadig.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <h2 className="text-xl font-serif font-bold text-slate-900">
                Published Knowledge Articles ({blogsList.length})
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              {categories.map((cat, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-full shadow-2xs">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {blogsList.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 max-w-lg mx-auto">
              No blog posts currently published.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogsList.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  {post.cover_image && (
                    <div className="h-56 overflow-hidden bg-slate-100 relative">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {post.category && (
                        <div className="absolute top-3 left-3 bg-amber-950/80 backdrop-blur-md text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-wider">
                          {post.category}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6 space-y-3 grow">
                    <h2 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {post.seo_description || post.content}
                    </p>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <User className="w-3.5 h-3.5 text-amber-600" />
                      <span className="truncate max-w-[140px]">{post.author}</span>
                    </div>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 transition-colors group-hover:translate-x-1"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
