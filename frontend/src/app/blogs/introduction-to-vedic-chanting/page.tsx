import PublicLayout from "@/components/PublicLayout";
import { getBlogBySlug, getSettings } from "@/lib/api-client";
import { Metadata } from "next";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Introduction to Vedic Chanting & Swara Science | Veda Brahma Shri Pradeep Nadig",
  description: "Discover the spiritual vibrations, phonetics, and health benefits of authentic Vedic mantra chanting.",
};

export default async function IntroductionToVedicChantingBlogPage() {
  let blog = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    blog = await getBlogBySlug("introduction-to-vedic-chanting");
  } catch (_) {}

  const fallbackBlog = {
    id: 1,
    title: "Introduction to Vedic Chanting & Swara Science",
    slug: "introduction-to-vedic-chanting",
    cover_image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200",
    author: "Veda Brahma Shri Pradeep Nadig",
    publish_date: "2026-07-25",
    category: "Vedic Wisdom",
    tags: ["Chanting", "Swaras", "Vedas"],
    content: `Vedic chanting is not merely vocal recitation; it is an ancient science of sound vibration (Shabda Brahma) designed to harmonize the mind, body, and subtle prana energies.

### The Significance of Swaras (Pitch & Accents)
Unlike spoken language, Vedic mantras adhere strictly to three primary tonal pitch accents:
1. **Udatta** (High pitch)
2. **Anudatta** (Low pitch)
3. **Svarita** (Combination / middle pitch accent)

Maintaining correct swara inflections ensures the preservation of the sacred sound frequencies preserved intact over thousands of years through oral tradition (Shruti).`,
  };

  const article = blog || fallbackBlog;

  return (
    <PublicLayout settings={settings}>
      <article className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[70vh]">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <div className="space-y-4">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
              {article.category || "Vedic Wisdom"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium border-b border-slate-200 pb-4">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-700" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>{article.publish_date}</span>
              </div>
            </div>
          </div>

          {article.cover_image && (
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          <div className="prose prose-amber max-w-none text-slate-700 text-base leading-relaxed whitespace-pre-line font-sans">
            {article.content}
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
