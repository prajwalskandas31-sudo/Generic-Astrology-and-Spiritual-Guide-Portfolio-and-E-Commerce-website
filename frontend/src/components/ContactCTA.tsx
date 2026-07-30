import { MessageCircle, Phone, Mail } from "lucide-react";

export interface ContactCTAProps {
  whatsappNumber?: string;
  mobileNumber?: string;
  email?: string;
}

export default function ContactCTA({
  whatsappNumber = "919880012345",
  mobileNumber = "+91 98800 12345",
  email = "pradeep@vedabrahma.com",
}: ContactCTAProps) {
  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <section className="bg-gradient-to-br from-amber-900 via-amber-950 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <div className="space-y-3">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">
            Connect &amp; Seek Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-50">
            Have Questions or Need Consultation?
          </h2>
          <p className="text-amber-200/80 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
            Reach out directly to Veda Brahma Shri Pradeep Nadig for service enquiries, astrological consultations, or workshop registration details.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Primary Action: WhatsApp */}
          <a
            href={`https://wa.me/${cleanWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-600/30 transition-all text-lg group"
          >
            <MessageCircle className="w-6 h-6 text-emerald-100 group-hover:scale-110 transition-transform" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Secondary Action: Call */}
          <a
            href={`tel:${mobileNumber}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 bg-amber-900/60 hover:bg-amber-800/80 border border-amber-500/30 text-amber-100 font-medium rounded-xl transition-all text-base"
          >
            <Phone className="w-5 h-5 text-amber-400" />
            <span>Call {mobileNumber}</span>
          </a>

          {/* Secondary Action: Email */}
          <a
            href={`mailto:${email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 bg-amber-900/60 hover:bg-amber-800/80 border border-amber-500/30 text-amber-100 font-medium rounded-xl transition-all text-base"
          >
            <Mail className="w-5 h-5 text-amber-400" />
            <span>Email Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
