import PublicLayout from "@/components/PublicLayout";
import CourseDetailClient from "../CourseDetailClient";
import { getSettings, getCourseBySlug } from "@/lib/api-client";
import { notFound } from "next/navigation";

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
