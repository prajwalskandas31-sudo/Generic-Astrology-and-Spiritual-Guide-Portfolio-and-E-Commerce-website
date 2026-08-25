import { notFound } from "next/navigation";
import PublicLayout from "@/components/PublicLayout";
import CourseDetailClient from "../CourseDetailClient";
import { getSettings, getCourseBySlug, getCourses } from "@/lib/api-client";
import { Metadata } from "next";
import { buildCourseSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seo";

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

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const course: any = await getCourseBySlug(slug);
    if (!course) throw new Error("Not found");

    const courseTitle = course.title || course.name || "Vedic Course";
    const title = `${courseTitle} Course | Veda Brahma Shri Pradeep Nadig`;
    const description = course.short_description || course.full_description || course.description || `Learn ${courseTitle} directly from Veda Brahma Shri Pradeep Nadig. Master authentic Vedic scriptures, chanting, and astrology.`;
    const url = `https://pradeepnadig.in/courses/${slug}`;
    const images = course.images || (course.cover_image ? [course.cover_image] : []);

    return {
      title,
      description,
      keywords: [
        courseTitle,
        "Vedic Classes",
        "Vedic Astrology Course",
        "Sanskrit Chanting Course",
        "Pradeep Nadig Classes",
        "Vastu Course Bangalore",
      ],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Pradeep Nadig",
        images: images.length > 0 ? [{ url: images[0] }] : ["/pradeep-nadig.jpg"],
      },
    };
  } catch (_) {
    return {
      title: "Vedic Course | Veda Brahma Shri Pradeep Nadig",
    };
  }
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let settings: Record<string, any> = {};
  let course: any = null;

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    course = await getCourseBySlug(slug);
  } catch (_) {}

  if (!course) {
    notFound();
  }

  const courseTitle = course.title || course.name || "Vedic Course";
  const courseSchema = buildCourseSchema({
    title: courseTitle,
    description: course.short_description || course.full_description || course.description,
    slug: course.slug || slug,
    duration: course.duration,
  });

  const faqSchema = course.faq && course.faq.length > 0 ? buildFAQSchema(course.faq) : null;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", item: "https://pradeepnadig.in" },
    { name: "Courses", item: "https://pradeepnadig.in/courses" },
    { name: courseTitle, item: `https://pradeepnadig.in/courses/${slug}` },
  ]);

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema,
      ...(courseSchema ? [courseSchema] : []),
      ...(faqSchema ? [faqSchema] : []),
    ],
  };

  return (
    <PublicLayout settings={settings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <CourseDetailClient course={course} />
    </PublicLayout>
  );
}
