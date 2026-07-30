import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail } from "lucide-react";

export interface FooterProps {
  siteName?: string;
  address?: string;
  mobile?: string;
  email?: string;
}

export default function Footer({
  siteName = "Veda Brahma Shri Pradeep Nadig",
  address = "No. 42, Veda Heritage Lane, Malleshwaram, Bengaluru, Karnataka 560003",
  mobile = "+91 98800 12345",
  email = "pradeep@vedabrahma.com",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-700 text-amber-200 flex items-center justify-center font-serif font-bold text-lg">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <span className="font-serif font-bold text-lg text-amber-100 tracking-tight">
                {siteName}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dedicated to preserving authentic Vedic traditions, performing sacred rituals, providing profound astrological guidance, and teaching ancient chanting.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  About Shri Pradeep
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-300 transition-colors">
                  Services &amp; Consultations
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="hover:text-amber-300 transition-colors">
                  Chanting Workshops
                </Link>
              </li>
              <li>
                <Link href="/classes" className="hover:text-amber-300 transition-colors">
                  Vedic Classes
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-amber-300 transition-colors">
                  Spiritual Blogs
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-300 transition-colors">
                  Photo &amp; Video Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Pages */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
              Policies &amp; Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-amber-300 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-amber-300 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-amber-300 transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-amber-300 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
              Address &amp; Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{mobile}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {currentYear} {siteName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="text-slate-400 hover:text-amber-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
