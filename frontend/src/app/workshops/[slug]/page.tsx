import PublicLayout from "@/components/PublicLayout";
import { getWorkshopBySlug, getSettings } from "@/lib/api-client";
import WorkshopDetailClient from "@/components/WorkshopDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { FALLBACK_WORKSHOPS } from "@/lib/fallback-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  return FALLBACK_WORKSHOPS.map((workshop) => ({
    slug: workshop.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const workshop = await getWorkshopBySlug(slug);
    return {
      title: workshop.seo_title || `${workshop.title} | Veda Brahma Shri Pradeep Nadig`,
      description: workshop.seo_description || workshop.description,
    };
  } catch (_) {
    return {
      title: "Workshop | Veda Brahma Shri Pradeep Nadig",
    };
  }
}

export default async function WorkshopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let workshop = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    workshop = await getWorkshopBySlug(slug);
  } catch (_) {
    notFound();
  }

  if (!workshop) {
    notFound();
  }

  return (
    <PublicLayout settings={settings}>
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          <WorkshopDetailClient workshop={workshop} />
        </div>
      </section>
    </PublicLayout>
  );
}
