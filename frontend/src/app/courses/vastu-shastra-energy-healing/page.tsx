import PublicLayout from "@/components/PublicLayout";
import CourseDetailClient from "../CourseDetailClient";
import { getSettings, getCourseBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const course: any = await getCourseBySlug("vastu-shastra-energy-healing").catch(() => null);
  const title = course?.seo_title || "Vastu Shastra & Energy Healing Course | Shri Pradeep Nadig";
  const description = course?.seo_description || course?.short_description || "Learn Vastu Purusha mandala, energy balancing, and residential Vastu remedies.";
  const url = "https://pradeepnadig.in/courses/vastu-shastra-energy-healing";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export const dynamic = "force-dynamic";

export default async function VastuShastraEnergyHealingPage() {
  const settings = await getSettings().catch(() => ({}));
  const course = await getCourseBySlug("vastu-shastra-energy-healing").catch(() => null);

  if (!course) notFound();

  return (
    <PublicLayout settings={settings}>
      <CourseDetailClient course={course as any} />
    </PublicLayout>
  );
}
