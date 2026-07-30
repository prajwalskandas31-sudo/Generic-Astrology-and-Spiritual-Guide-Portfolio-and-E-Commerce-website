import PublicLayout from "@/components/PublicLayout";
import { getWorkshopBySlug, getSettings } from "@/lib/api-client";
import WorkshopDetailClient from "@/components/WorkshopDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Chant Mastery Workshop | Veda Brahma Shri Pradeep Nadig",
  description: "Learn traditional Vedic chanting phonetics, Swara rules, and sacred Suktams in this intensive workshop.",
};

export default async function VedicChantMasteryWorkshopPage() {
  let workshop = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    workshop = await getWorkshopBySlug("vedic-chant-mastery-august-2026");
  } catch (_) {}

  const fallbackWorkshop = {
    id: 1,
    title: "Vedic Chant Mastery Workshop",
    slug: "vedic-chant-mastery-august-2026",
    cover_image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200",
    description: "Learn traditional Vedic chanting phonetics (Swaras), correct pronunciation, and sacred Suktam recitations under authentic guidance.",
    start_date: "2026-08-15",
    end_date: "2026-08-17",
    venue: "Veda Cultural Center",
    address: "Malleshwaram, Bengaluru 560003",
    google_maps_link: "https://maps.google.com",
    duration: "3 Days",
    price: 2500,
    capacity: 30,
    status: "Published",
    registration_deadline: "2026-08-14",
    featured: true,
    batches: [
      {
        id: 1,
        workshop_id: 1,
        batch_name: "Morning Batch (7:00 AM - 10:00 AM)",
        start_time: "07:00 AM",
        end_time: "10:00 AM",
        capacity: 30,
        remaining_seats: 18,
        status: "Active",
      },
    ],
  };

  return (
    <PublicLayout settings={settings}>
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          <WorkshopDetailClient workshop={workshop || fallbackWorkshop} />
        </div>
      </section>
    </PublicLayout>
  );
}
