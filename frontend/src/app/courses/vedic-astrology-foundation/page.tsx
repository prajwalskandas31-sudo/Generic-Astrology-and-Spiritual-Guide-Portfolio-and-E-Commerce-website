import PublicLayout from "@/components/PublicLayout";
import CourseDetailClient from "../CourseDetailClient";
import { getSettings, getCourseBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const course: any = await getCourseBySlug("vedic-astrology-foundation").catch(() => null);
  const title = course?.seo_title || "Vedic Astrology Foundation Course | Shri Pradeep Nadig";
  const description = course?.seo_description || course?.short_description || "Comprehensive beginner-to-intermediate course in Vedic Astrology chart reading.";
  const url = "https://pradeepnadig.in/courses/vedic-astrology-foundation";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export const dynamic = "force-dynamic";

export default async function VedicAstrologyFoundationPage() {
  const settings = await getSettings().catch(() => ({}));
  const course = await getCourseBySlug("vedic-astrology-foundation").catch(() => null);

  if (!course) notFound();

  return (
    <PublicLayout settings={settings}>
      <CourseDetailClient course={course as any} />
    </PublicLayout>
  );
}
