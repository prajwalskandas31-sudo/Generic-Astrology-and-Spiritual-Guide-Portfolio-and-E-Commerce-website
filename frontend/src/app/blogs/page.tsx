import PublicLayout from "@/components/PublicLayout";
import { getBlogs, getSettings } from "@/lib/api-client";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Blog } from "@/types";

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

  return (
    <PublicLayout settings={settings}>
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 border-b border-amber-200/80 py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-200/80">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-200/80 border border-amber-400/50 text-amber-900 text-xs font-semibold uppercase tracking-widest">
            Vedic Insights &amp; Articles
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-950">
            Spiritual Blogs &amp; Articles
          </h1>
          <p className="text-amber-900/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Read insightful writings on Vedic rituals, astrological guidance, Sandhyavandana traditions, and spiritual discipline by Shri Pradeep Nadig.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {blogsList.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 max-w-lg mx-auto">
              No blog posts currently published.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogsList.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  {post.cover_image && (
                    <div className="h-52 overflow-hidden bg-slate-100">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-4 grow">
                    {post.category && (
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-full uppercase">
                        {post.category}
                      </span>
                    )}
                    <h2 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-600" />
                      <span>{post.author}</span>
                    </div>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="font-semibold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
