import PublicLayout from "@/components/PublicLayout";
import { getWorkshopBySlug, getSettings } from "@/lib/api-client";
import WorkshopDetailClient from "@/components/WorkshopDetailClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Meditation & Mindful Pranayama Workshop | Veda Brahma Shri Pradeep Nadig",
  description: "Guided 3-day immersive Vedic meditation, mantra japa, and authentic pranayama breathing workshop for mental clarity and inner peace.",
};

export default async function MeditationWorkshopPage() {
  let workshop = null;
  let settings: Record<string, any> = {};

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    workshop = await getWorkshopBySlug("meditation");
  } catch (_) {}

  const fallbackWorkshop = {
    id: 99,
    title: "Vedic Meditation & Mindful Pranayama Workshop",
    slug: "meditation",
    cover_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200",
    description: "Immerse yourself in authentic Vedic meditation techniques, dhyana practices, and guided pranayama breathwork under the personal guidance of Veda Brahma Shri Pradeep Nadig.",
    start_date: "2026-09-10",
    end_date: "2026-09-12",
    venue: "Veda Cultural Sanctuary",
    address: "Malleshwaram, Bengaluru, Karnataka 560003",
    google_maps_link: "https://maps.google.com",
    duration: "3 Days (2 Hours per session)",
    price: 3500,
    capacity: 25,
    status: "Published",
    registration_deadline: "2026-09-08",
    featured: true,
    batches: [
      {
        id: 101,
        workshop_id: 99,
        batch_name: "Morning Meditative Dhyana (6:30 AM - 8:30 AM)",
        start_time: "06:30 AM",
        end_time: "08:30 AM",
        capacity: 15,
        remaining_seats: 12,
        status: "Active",
      },
      {
        id: 102,
        workshop_id: 99,
        batch_name: "Evening Tranquility Session (6:00 PM - 8:00 PM)",
        start_time: "06:00 PM",
        end_time: "08:00 PM",
        capacity: 10,
        remaining_seats: 8,
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
