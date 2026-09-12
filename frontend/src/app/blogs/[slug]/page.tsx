import PublicLayout from "@/components/PublicLayout";
import { getBlogBySlug, getBlogs, getSettings } from "@/lib/api-client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, HelpCircle, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/seo";
import { Blog } from "@/types";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlogBySlug(slug);
    if (!blog) throw new Error("Not found");

    const title = blog.seo_title || `${blog.title} | Veda Brahma Shri Pradeep Nadig`;
    const description = blog.seo_description || blog.content.substring(0, 160);
    const url = `https://pradeepnadig.in/blogs/${slug}`;

    return {
      title,
      description,
      keywords: [
        blog.title,
        blog.category || "Vedic Insights",
        "Spiritual Blog",
        "Pradeep Nadig Articles",
        "Vedic Knowledge",
        "Bangalore Astrologer Blog",
        "Vastu Shastra Guide",
        "Homa Rituals Procedure",
      ],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Pradeep Nadig",
        type: "article",
        publishedTime: blog.publish_date,
        authors: [blog.author || "Pradeep Nadig"],
        images: blog.cover_image ? [{ url: blog.cover_image }] : ["/pradeep-nadig.jpg"],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: blog.cover_image ? [blog.cover_image] : ["/pradeep-nadig.jpg"],
      },
    };
  } catch (_) {
    return {
      title: "Blog Article | Veda Brahma Shri Pradeep Nadig",
    };
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let blog: Blog | null = null;
  let allBlogs: Blog[] = [];
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

  try {
    allBlogs = await getBlogs();
  } catch (_) {}

  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== slug && (b.category === blog?.category || true))
    .slice(0, 3);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.seo_description || blog.content.substring(0, 160),
    image: blog.cover_image || "https://pradeepnadig.in/pradeep-nadig.jpg",
    author: {
      "@type": "Person",
      name: blog.author || "Veda Brahma Shri Pradeep Nadig",
      url: "https://pradeepnadig.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Shaankari",
      logo: {
        "@type": "ImageObject",
        url: "https://pradeepnadig.in/shaankari-logo.png",
      },
    },
    datePublished: blog.publish_date || "2026-01-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://pradeepnadig.in/blogs/${slug}`,
    },
  };

  const faqSchema =
    blog.faq && blog.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blog.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", item: "https://pradeepnadig.in" },
    { name: "Blogs", item: "https://pradeepnadig.in/blogs" },
    { name: blog.title, item: `https://pradeepnadig.in/blogs/${slug}` },
  ]);

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema,
      blogSchema,
      ...(faqSchema ? [faqSchema] : []),
    ],
  };

  // Helper to render content with markdown headings, blockquotes, lists
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split(/\n\n+/);
    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-2xl sm:text-3xl font-serif font-bold text-amber-950 mt-8 mb-4 border-b border-amber-200/60 pb-2"
          >
            {trimmed.replace(/^##\s+/, "")}
          </h2>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-xl font-serif font-bold text-amber-900 mt-6 mb-3"
          >
            {trimmed.replace(/^###\s+/, "")}
          </h3>
        );
      }
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote
            key={idx}
            className="my-6 p-5 bg-amber-50/80 border-l-4 border-amber-600 rounded-r-xl italic text-amber-950 font-serif text-base sm:text-lg shadow-xs"
          >
            {trimmed.replace(/^>\s+/, "")}
          </blockquote>
        );
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split(/\n/);
        return (
          <ul key={idx} className="space-y-2.5 my-4 pl-1">
            {items.map((item, iIdx) => (
              <li key={iIdx} className="flex items-start gap-2.5 text-slate-700 text-base">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span>{item.replace(/^[-*]\s+/, "")}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-slate-700 text-base sm:text-lg leading-relaxed mb-5">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <PublicLayout settings={settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
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
            {blog.category && (
              <span className="inline-block px-3.5 py-1.5 bg-amber-100/90 text-amber-950 border border-amber-300 text-xs font-semibold rounded-full uppercase tracking-wider">
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

          {/* Main Cover Image */}
          {blog.cover_image && (
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 max-h-[480px]">
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Main Article Content */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200 max-w-none text-slate-700 leading-relaxed font-sans">
            {renderFormattedContent(blog.content)}
          </div>

          {/* Additional Images Showcase (if provided) */}
          {blog.images && blog.images.length > 0 && (
            <div className="space-y-4 bg-amber-50/50 p-6 sm:p-8 rounded-2xl border border-amber-200/80">
              <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-xl">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Visual Highlights & Ritual Showcase</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {blog.images.map((imgUrl, iIdx) => (
                  <div key={iIdx} className="rounded-xl overflow-hidden shadow-xs border border-amber-200 h-48 bg-slate-100">
                    <img
                      src={imgUrl}
                      alt={`${blog.title} - Highlight ${iIdx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contextual CTA Banner */}
          {blog.related_offering_slug && (
            <div className="bg-gradient-to-br from-amber-950 via-amber-900 to-slate-950 text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 my-8">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 justify-center md:justify-start">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Sacred Service Booking
                </span>
                <h3 className="text-2xl font-serif font-bold text-amber-100">
                  {blog.related_offering_title || "Perform Authentic Vedic Rituals"}
                </h3>
                <p className="text-slate-300 text-sm max-w-xl font-light">
                  Consult with Veda Brahma Shri Pradeep Nadig for authentic ritual execution, Muhurtha selection, and personalized Veda Parihara solutions in Bengaluru.
                </p>
              </div>
              <Link
                href={
                  blog.related_offering_type === "Consultation"
                    ? "/consultations"
                    : blog.related_offering_type === "Workshop"
                    ? `/workshops/${blog.related_offering_slug}`
                    : blog.related_offering_type === "Course"
                    ? `/courses/${blog.related_offering_slug}`
                    : `/services/${blog.related_offering_slug}`
                }
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm whitespace-nowrap"
              >
                Book / Enquire Now
              </Link>
            </div>
          )}

          {/* Frequently Asked Questions (FAQ) */}
          {blog.faq && blog.faq.length > 0 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
              <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-2xl">
                <HelpCircle className="w-6 h-6 text-amber-700" />
                <span>Frequently Asked Questions</span>
              </div>
              <div className="space-y-4 divide-y divide-slate-100">
                {blog.faq.map((faqItem, idx) => (
                  <div key={idx} className={idx === 0 ? "space-y-2" : "pt-4 space-y-2"}>
                    <h4 className="font-serif font-bold text-lg text-amber-950 flex items-start gap-2">
                      <span className="text-amber-600 font-sans text-sm font-semibold">Q.</span>
                      <span>{faqItem.question}</span>
                    </h4>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-6">
                      {faqItem.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center gap-2 pt-4">
              <Tag className="w-4 h-4 text-amber-700" />
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-medium rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles Section */}
          {relatedBlogs.length > 0 && (
            <div className="pt-10 border-t border-slate-200 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Related Spiritual Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blogs/${rel.slug}`}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between"
                  >
                    {rel.cover_image && (
                      <div className="h-40 overflow-hidden bg-slate-100">
                        <img
                          src={rel.cover_image}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                        {rel.category}
                      </span>
                      <h4 className="font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 text-base">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="p-4 pt-0 text-xs font-semibold text-amber-800 flex items-center gap-1">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PublicLayout>
  );
}
