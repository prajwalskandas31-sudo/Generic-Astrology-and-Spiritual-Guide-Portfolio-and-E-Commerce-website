import PublicLayout from "@/components/PublicLayout";
import { getSettings } from "@/lib/api-client";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";

export const revalidate = 60;

export default async function ContactPage() {
  let settings: Record<string, any> = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const mobile = settings.contact_mobile || "+91 98800 12345";
  const whatsapp = settings.whatsapp_number || "919880012345";
  const email = settings.contact_email || "pradeep@vedabrahma.com";
  const address = settings.office_address || "No. 42, Veda Heritage Lane, Malleshwaram, Bengaluru, Karnataka 560003";
  const mapsLink = settings.google_maps_link || "https://maps.google.com";

  const cleanWhatsApp = whatsapp.replace(/[^0-9]/g, "");

  return (
    <PublicLayout settings={settings} showContactCTA={false}>
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 border-b border-amber-200/80 py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-amber-200/80">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-200/80 border border-amber-400/50 text-amber-900 text-xs font-semibold uppercase tracking-widest">
            Reach Out Directly
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-amber-950">
            Contact Shri Pradeep Nadig
          </h1>
          <p className="text-amber-900/80 text-base sm:text-lg max-w-2xl mx-auto font-light">
            We are here to assist with ritual bookings, astrological consultations, and workshop enquiries.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Primary Action Card: WhatsApp */}
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6 relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-emerald-200 font-semibold text-xs uppercase tracking-widest">
                Fastest Response
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold">
                Connect Directly on WhatsApp
              </h2>
              <p className="text-emerald-100/90 text-sm sm:text-base max-w-xl mx-auto">
                Send a direct message on WhatsApp for instant enquiry responses, ritual slot confirmation, and venue coordinates.
              </p>
            </div>

            <a
              href={`https://wa.me/${cleanWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-emerald-950 font-bold rounded-2xl shadow-lg hover:bg-emerald-50 transition-all text-lg group"
            >
              <MessageCircle className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>Open WhatsApp Chat</span>
            </a>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Phone className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Phone Call</h3>
              <p className="text-xs text-slate-500">Available during working hours</p>
              <a href={`tel:${mobile}`} className="inline-block font-semibold text-amber-800 hover:underline text-sm">
                {mobile}
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Mail className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Email Address</h3>
              <p className="text-xs text-slate-500">Send detailed formal requests</p>
              <a href={`mailto:${email}`} className="inline-block font-semibold text-amber-800 hover:underline text-sm">
                {email}
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Office Location</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{address}</p>
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block font-semibold text-amber-800 hover:underline text-xs"
              >
                View on Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
