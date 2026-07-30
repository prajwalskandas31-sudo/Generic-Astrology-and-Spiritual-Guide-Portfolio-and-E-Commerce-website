import PublicLayout from "@/components/PublicLayout";
import { getOfferingBySlug, getSettings } from "@/lib/api-client";
import OfferingDetailClient from "@/components/OfferingDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const offering = await getOfferingBySlug(slug);
    return {
      title: offering.seo_title || `${offering.title} | Veda Brahma Shri Pradeep Nadig`,
      description: offering.seo_description || offering.short_description,
    };
  } catch (_) {
    return {
      title: "Service | Veda Brahma Shri Pradeep Nadig",
    };
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let offering = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    offering = await getOfferingBySlug(slug);
  } catch (_) {
    notFound();
  }

  if (!offering) {
    notFound();
  }

  return (
    <PublicLayout settings={settings}>
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          <OfferingDetailClient offering={offering} />
        </div>
      </section>
    </PublicLayout>
  );
}
