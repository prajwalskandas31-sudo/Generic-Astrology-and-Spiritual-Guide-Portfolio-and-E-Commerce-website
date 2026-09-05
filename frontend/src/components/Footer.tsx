import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, Crown } from "lucide-react";

export interface FooterProps {
  siteName?: string;
  address?: string;
  mobile?: string;
  email?: string;
}

export default function Footer({
  siteName = "Veda Brahma Shri Pradeep Nadig",
  address = "Asharaya layout, Vaderahalli, K.G.Vaderahalli, Bengaluru, Karnataka 560097",
  mobile = "+91 98440 42068",
  email = "pradeep@vedabrahma.com",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-amber-100/90 via-amber-50 to-orange-100/80 text-slate-800 border-t border-amber-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-700 text-amber-200 flex items-center justify-center font-serif font-bold text-lg">
                <Sparkles className="w-4 h-4 text-amber-900" />
              </div>
              <span className="font-serif font-bold text-lg text-amber-950 tracking-tight">
                {siteName}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Dedicated to preserving authentic Vedic traditions, performing sacred rituals, providing profound astrological guidance, and teaching ancient chanting.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-900">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-900 transition-colors">
                  About Shri Pradeep
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-900 transition-colors">
                  Services &amp; Consultations
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="hover:text-amber-900 transition-colors">
                  Chanting Workshops
                </Link>
              </li>
              <li>
                <Link href="/classes" className="hover:text-amber-900 transition-colors">
                  Vedic Classes
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-amber-900 transition-colors font-medium text-amber-900">
                  Vedic Courses &amp; Certifications
                </Link>
              </li>
              <li>
                <Link href="/live-events" className="hover:text-amber-900 transition-colors font-medium text-amber-900">
                  Sacred Live Events
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-amber-900 transition-colors">
                  Spiritual Blogs
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-900 transition-colors">
                  Photo &amp; Video Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Pages */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-900">
              Policies &amp; Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-amber-900 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-amber-900 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-amber-900 transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-amber-900 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-900">
              Address &amp; Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-800 shrink-0" />
                <span>{mobile}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-800 shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Local SEO Service Areas Footer Banner */}
        <div className="mt-12 pt-8 border-t border-amber-300/60 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 font-serif">
            Kannada Purohit &amp; Vadhyar Services in Bangalore (Near Me)
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            Veda Brahma Shri Pradeep Nadig provides authentic <strong>Kannada Purohit</strong>, <strong>Vedic Vadhyar</strong>, and <strong>Pandit Services</strong> for Griha Pravesha, Ganapathi Homa, Navagraha Homa, Vastu Homa, Mrityunjaya Homa, Naga Shanthi, and Satyanarayana Pooja across Bengaluru including <strong>Vaderahalli, Yelahanka, Vidyaranyapura, Hebbal, Sahakara Nagar, Malleswaram, Rajajinagar, Jayanagar, Indiranagar, and Whitefield</strong>.
          </p>
        </div>

        {/* Bottom Bar & Royal Creator Tagmark */}
        <div className="mt-8 pt-8 border-t border-amber-800/20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-600">
          <p className="order-2 md:order-1 text-center md:text-left">
            &copy; {currentYear} {siteName}. All rights reserved.
          </p>

          {/* Royal Creator Tagmark */}
          <div className="order-1 md:order-2 flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-amber-100 border border-amber-500/40 shadow-lg shadow-amber-950/10 hover:border-amber-400 hover:shadow-amber-500/20 transition-all duration-300 group">
            <Crown className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
            <span className="font-serif tracking-wider text-[11.5px] whitespace-nowrap">
              Designed &amp; Crafted by{" "}
              <span className="font-bold bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent uppercase tracking-widest drop-shadow-sm">
                Prajwal Skanda S
              </span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300/80 animate-pulse shrink-0" />
          </div>

          <div className="order-3 flex items-center gap-4">
            <Link href="/admin/login" className="text-slate-600 hover:text-amber-900 transition-colors font-medium">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
