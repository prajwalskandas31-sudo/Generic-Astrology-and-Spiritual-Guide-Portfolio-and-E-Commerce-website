import { MessageCircle, Phone, Mail } from "lucide-react";

export interface ContactCTAProps {
  whatsappNumber?: string;
  mobileNumber?: string;
  email?: string;
}

export default function ContactCTA({
  whatsappNumber = "919844042068",
  mobileNumber = "+91 98440 42068",
  email = "pradeep@vedabrahma.com",
}: ContactCTAProps) {
  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-y border-amber-200/80">
      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <div className="space-y-3">
          <span className="text-amber-800 font-semibold text-xs uppercase tracking-widest bg-amber-200/70 px-3 py-1 rounded-full border border-amber-300">
            Connect &amp; Seek Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-950">
            Have Questions or Need Consultation?
          </h2>
          <p className="text-amber-900/80 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-700/20 transition-all text-lg group"
          >
            <MessageCircle className="w-6 h-6 text-emerald-100 group-hover:scale-110 transition-transform" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Secondary Action: Call */}
          <a
            href={`tel:${mobileNumber}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-amber-50 border border-amber-300 text-amber-950 font-bold rounded-xl shadow-xs transition-all text-base"
          >
            <Phone className="w-5 h-5 text-amber-700" />
            <span>Call {mobileNumber}</span>
          </a>

          {/* Secondary Action: Email */}
          <a
            href={`mailto:${email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-amber-50 border border-amber-300 text-amber-950 font-bold rounded-xl shadow-xs transition-all text-base"
          >
            <Mail className="w-5 h-5 text-amber-700" />
            <span>Email Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
