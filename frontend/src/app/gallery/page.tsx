import PublicLayout from "@/components/PublicLayout";
import { getGallery, getSettings } from "@/lib/api-client";
import GalleryClient from "@/components/GalleryClient";
import { GalleryItem } from "@/types";

export const revalidate = 60;

export default async function GalleryPage() {
  let settings: Record<string, any> = {};
  let galleryItems: GalleryItem[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    galleryItems = await getGallery();
  } catch (_) {}

  return (
    <PublicLayout settings={settings}>
      {/* Header */}
      <section className="bg-gradient-to-b from-amber-950 via-slate-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-900/40">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            Visual Highlights
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-50">
            Photo &amp; Video Gallery
          </h1>
          <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Glimpses of sacred homam rituals, chanting workshops, discourse sessions, and Vedic celebrations.
          </p>
        </div>
      </section>

      {/* Gallery Grid Client */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <GalleryClient items={galleryItems} />
        </div>
      </section>
    </PublicLayout>
  );
}
