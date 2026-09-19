import PublicLayout from "@/components/PublicLayout";
import CourseDetailClient from "../CourseDetailClient";
import { getSettings, getCourseBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const course: any = await getCourseBySlug("prashna-marga-horary-astrology").catch(() => null);
  const title = course?.seo_title || "Prashna Marga Horary Astrology Course | Shri Pradeep Nadig";
  const description = course?.seo_description || course?.short_description || "Master Prashna Marga horary astrology for instant query reading.";
  const url = "https://pradeepnadig.in/courses/prashna-marga-horary-astrology";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export const dynamic = "force-dynamic";

export default async function PrashnaMargaHoraryAstrologyPage() {
  const settings = await getSettings().catch(() => ({}));
  const course = await getCourseBySlug("prashna-marga-horary-astrology").catch(() => null);

  if (!course) notFound();

  return (
    <PublicLayout settings={settings}>
      <CourseDetailClient course={course as any} />
    </PublicLayout>
  );
}
