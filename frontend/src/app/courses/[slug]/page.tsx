import { notFound } from "next/navigation";
import PublicLayout from "@/components/PublicLayout";
import CourseDetailClient from "../CourseDetailClient";
import { getSettings, getCourseBySlug, getCourses } from "@/lib/api-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const courses = await getCourses();
    return courses.map((c) => ({ slug: c.slug }));
  } catch (_) {
    return [
      { slug: "vedic-astrology-foundation" },
      { slug: "sacred-vedic-chanting-mastery" },
      { slug: "prashna-marga-horary-astrology" },
      { slug: "vastu-shastra-energy-healing" },
    ];
  }
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let settings: Record<string, any> = {};
  let course: import("@/types").Course | null = null;

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    course = await getCourseBySlug(slug);
  } catch (_) {}

  if (!course) {
    notFound();
  }

  return (
    <PublicLayout settings={settings}>
      <CourseDetailClient course={course} />
    </PublicLayout>
  );
}
