import PublicLayout from "@/components/PublicLayout";
import CourseDetailClient from "../CourseDetailClient";
import { getSettings, getCourseBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const course: any = await getCourseBySlug("sacred-vedic-chanting-mastery").catch(() => null);
  const title = course?.seo_title || "Sacred Vedic Chanting Mastery | Shri Pradeep Nadig";
  const description = course?.seo_description || course?.short_description || "Master authentic Vedic Swara chanting and Suktas under Shri Pradeep Nadig.";
  const url = "https://pradeepnadig.in/courses/sacred-vedic-chanting-mastery";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export const dynamic = "force-dynamic";

export default async function SacredVedicChantingMasteryPage() {
  const settings = await getSettings().catch(() => ({}));
  const course = await getCourseBySlug("sacred-vedic-chanting-mastery").catch(() => null);

  if (!course) notFound();

  return (
    <PublicLayout settings={settings}>
      <CourseDetailClient course={course as any} />
    </PublicLayout>
  );
}
