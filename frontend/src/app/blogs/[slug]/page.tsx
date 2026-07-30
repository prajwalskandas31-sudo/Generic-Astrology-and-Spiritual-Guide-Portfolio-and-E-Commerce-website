import PublicLayout from "@/components/PublicLayout";
import { getBlogBySlug, getSettings } from "@/lib/api-client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlogBySlug(slug);
    return {
      title: blog.seo_title || `${blog.title} | Veda Brahma Shri Pradeep Nadig`,
      description: blog.seo_description || blog.content.substring(0, 160),
    };
  } catch (_) {
    return {
      title: "Blog Article | Veda Brahma Shri Pradeep Nadig",
    };
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let blog = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    blog = await getBlogBySlug(slug);
  } catch (_) {
    notFound();
  }

  if (!blog) {
    notFound();
  }

  return (
    <PublicLayout settings={settings}>
      <article className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[70vh]">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Blogs</span>
          </Link>

          <div className="space-y-4">
            {blog.category && (
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-full uppercase">
                {blog.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-200 py-3">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-4 h-4 text-amber-600" />
                <span>{blog.author}</span>
              </div>
              {blog.publish_date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Published on {blog.publish_date}</span>
                </div>
              )}
            </div>
          </div>

          {blog.cover_image && (
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 max-h-[450px]">
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200 prose prose-slate max-w-none text-slate-700 leading-relaxed font-sans">
            <p>{blog.content}</p>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center gap-2 pt-4">
              <Tag className="w-4 h-4 text-amber-700" />
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-200/60 text-slate-700 text-xs rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PublicLayout>
  );
}
