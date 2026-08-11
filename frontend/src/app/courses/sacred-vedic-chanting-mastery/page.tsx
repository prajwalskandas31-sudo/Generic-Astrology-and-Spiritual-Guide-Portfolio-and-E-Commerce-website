import PublicLayout from "@/components/PublicLayout";
import CourseDetailClient from "../CourseDetailClient";
import { getSettings, getCourseBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SacredVedicChantingMasteryPage() {
  const settings = await getSettings().catch(() => ({}));
  const course = await getCourseBySlug("sacred-vedic-chanting-mastery").catch(() => null);

  if (!course) notFound();

  return (
    <PublicLayout settings={settings}>
      <CourseDetailClient course={course} />
    </PublicLayout>
  );
}
