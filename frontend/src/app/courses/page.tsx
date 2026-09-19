import PublicLayout from "@/components/PublicLayout";
import CoursesClient from "./CoursesClient";
import { getSettings, getCourses } from "@/lib/api-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Courses & Certifications | Shri Pradeep Nadig",
  description:
    "Comprehensive structured courses in Vedic Astrology, Vastu Shastra, Prashna Marga, and Sacred Sanskrit Chanting in Bengaluru.",
  alternates: {
    canonical: "https://pradeepnadig.in/courses",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CoursesPage() {
  let settings: Record<string, any> = {};
  let courses: import("@/types").Course[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    courses = await getCourses();
  } catch (_) {}

  return (
    <PublicLayout settings={settings}>
      <CoursesClient initialCourses={courses} />
    </PublicLayout>
  );
}
