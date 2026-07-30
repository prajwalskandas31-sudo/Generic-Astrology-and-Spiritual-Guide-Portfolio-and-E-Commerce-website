import PublicLayout from "@/components/PublicLayout";
import { getWorkshops, getSettings } from "@/lib/api-client";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Users, CheckCircle2 } from "lucide-react";
import { Workshop } from "@/types";

export const revalidate = 60;

export default async function WorkshopsPage() {
  let settings: Record<string, any> = {};
  let workshops: Workshop[] = [];

  try {
    settings = await getSettings();
  } catch (_) {}

  try {
    workshops = await getWorkshops();
  } catch (_) {}

  const upcomingWorkshops = workshops.filter((w) => w.status === "Published");
  const completedWorkshops = workshops.filter((w) => w.status === "Completed");

  return (
    <PublicLayout settings={settings}>
      {/* Header */}
      <section className="bg-gradient-to-b from-amber-950 via-slate-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-900/40">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            Vedic Chant Mastery
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-50">
            Chanting Workshops &amp; Intensive Learning
          </h1>
          <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Participate in authentic Vedic chant mastery workshops to learn accurate Swara intonations and Sukta meanings.
          </p>
        </div>
      </section>

      {/* UPCOMING WORKSHOPS SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Upcoming Workshops</h2>
            <p className="text-sm text-slate-500 mt-1">Open for registration &amp; batch allocation</p>
          </div>

          {upcomingWorkshops.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 max-w-lg mx-auto">
              No upcoming workshops currently open for registration.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingWorkshops.map((ws) => {
                const totalRemaining = ws.batches.reduce((sum, b) => sum + b.remaining_seats, 0);
                const isFull = totalRemaining <= 0;
                return (
                  <div
                    key={ws.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    {ws.cover_image && (
                      <div className="h-52 overflow-hidden bg-slate-100 relative">
                        <img
                          src={ws.cover_image}
                          alt={ws.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${
                              isFull
                                ? "bg-red-600 text-white"
                                : "bg-emerald-600 text-white"
                            }`}
                          >
                            {isFull ? "Registration Closed" : `${totalRemaining} Seats Left`}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 space-y-4 grow">
                      <div className="flex items-center justify-between text-xs text-amber-700 font-semibold">
                        <span>₹{ws.price} Registration Fee</span>
                        {ws.duration && <span>{ws.duration}</span>}
                      </div>

                      <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                        {ws.title}
                      </h3>

                      <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                        {ws.description}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                        {ws.start_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>Dates: <strong>{ws.start_date} to {ws.end_date || ws.start_date}</strong></span>
                          </div>
                        )}
                        {ws.venue && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="line-clamp-1">Venue: <strong>{ws.venue}</strong></span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <Link
                        href={`/workshops/${ws.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
                      >
                        <span>View Details &amp; Register</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* COMPLETED WORKSHOPS */}
          {completedWorkshops.length > 0 && (
            <div className="pt-12 border-t border-slate-200 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-slate-900">Completed Workshops</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedWorkshops.map((ws) => (
                  <div key={ws.id} className="bg-slate-100 rounded-xl p-6 border border-slate-200 opacity-85">
                    <span className="text-xs text-slate-500 font-semibold uppercase">Completed</span>
                    <h3 className="text-lg font-serif font-bold text-slate-900 mt-1">{ws.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{ws.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
