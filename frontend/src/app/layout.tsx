import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://pradeepnadig.in"),
  title: {
    default: "Veda Brahma Shri Pradeep Nadig | Vedic Scholar & Spiritual Guide",
    template: "%s | Pradeep Nadig",
  },
  description:
    "Official website of Veda Brahma Shri Pradeep Nadig. Explore authentic Vedic rituals, astrology consultations, chant workshops, Vedic classes, and spiritual insights.",
  keywords: [
    "Kannada Purohit near me",
    "Kannada Purohit in Bangalore",
    "Vedic Pandit near me",
    "Kannada Vadhyar Bangalore",
    "Kannada Astrologer near me",
    "Purohit in Vaderahalli Yelahanka",
    "Griha Pravesha Kannada Purohit near me",
    "Ganapathi Homa Pandit near me",
    "Vastu Homa Purohit near me",
    "Pradeep Nadig near me",
    "Pradeep Nadig",
    "Veda Brahma Shri Pradeep Nadig",
    "Vedic Scholar",
    "Spiritual Guide",
    "Vedic Rituals",
    "Astrology Consultation",
    "Chant Workshops",
    "Vedic Classes",
    "Shaankari",
    "Pooja Services",
    "Purohit Bengaluru",
  ],
  authors: [{ name: "Pradeep Nadig", url: "https://pradeepnadig.in" }],
  creator: "Pradeep Nadig",
  publisher: "Shaankari",
  alternates: {
    canonical: "https://pradeepnadig.in",
  },
  openGraph: {
    title: "Veda Brahma Shri Pradeep Nadig | Authentic Kannada Purohit & Astrologer near me",
    description:
      "Official website of Veda Brahma Shri Pradeep Nadig. Authentic Kannada Purohit & Vedic Pandit near me for Griha Pravesha, Homas, Poojas, and Astrology Consultations in Bengaluru.",
    url: "https://pradeepnadig.in",
    siteName: "Pradeep Nadig",
    images: [
      {
        url: "/pradeep-nadig.jpg",
        width: 1200,
        height: 630,
        alt: "Veda Brahma Shri Pradeep Nadig",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veda Brahma Shri Pradeep Nadig | Kannada Purohit & Astrologer near me",
    description:
      "Official website of Veda Brahma Shri Pradeep Nadig. Authentic Kannada Purohit & Vedic Pandit near me for rituals and astrology.",
    images: ["/pradeep-nadig.jpg"],
  },
  verification: {
    google: "skBzgmTVLbNeEMjLcSImgJlc9-6vGtWTtU9CH_GDGC4",
  },
  icons: {
    icon: [
      { url: "/shaankari-logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/shaankari-logo.png",
    apple: "/shaankari-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pradeepnadig.in/#person",
      name: "Pradeep Nadig",
      alternateName: ["Veda Brahma Shri Pradeep Nadig", "Shri Pradeep Nadig"],
      url: "https://pradeepnadig.in",
      image: "https://pradeepnadig.in/pradeep-nadig.jpg",
      jobTitle: "Vedic Scholar & Spiritual Guide",
      telephone: "+91 98440 42068",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Asharaya layout, Vaderahalli",
        addressLocality: "K.G.Vaderahalli, Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560097",
        addressCountry: "IN",
      },
      description:
        "Vedic Scholar, Spiritual Guide, and practitioner providing authentic Vedic rituals, consultations, chant workshops, and classes.",
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://pradeepnadig.in/#localbusiness",
      name: "Veda Brahma Shri Pradeep Nadig - Kannada Purohit & Vedic Astrologer",
      alternateName: "Shaankari Creations - Pradeep Nadig",
      image: "https://pradeepnadig.in/pradeep-nadig.jpg",
      logo: "https://pradeepnadig.in/shaankari-logo.png",
      url: "https://pradeepnadig.in",
      telephone: "+919844042068",
      priceRange: "₹₹",
      hasMap: "https://maps.google.com/?q=Pradeep+Nadig+Asharaya+layout+Vaderahalli+KG+Vaderahalli+Karnataka+560097",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Asharaya layout, Vaderahalli, K.G.Vaderahalli",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560097",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.0903,
        longitude: 77.5458,
      },
      areaServed: [
        "Bengaluru",
        "Vaderahalli",
        "Yelahanka",
        "Vidyaranyapura",
        "Hebbal",
        "Sahakara Nagar",
        "Karnataka",
        "India",
      ],
      knowsAbout: [
        "Kannada Purohit near me",
        "Vedic Pandit near me",
        "Kannada Vadhyar",
        "Vastu Homa",
        "Griha Pravesha Pooja",
        "Ganapathi Homa",
        "Navagraha Homa",
        "Maha Mrityunjaya Homa",
        "Vedic Astrology Consultation",
      ],
      sameAs: [
        "https://maps.google.com/?q=Pradeep+Nadig+Asharaya+layout+Vaderahalli+KG+Vaderahalli+Karnataka+560097",
        "https://facebook.com",
        "https://instagram.com",
        "https://youtube.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://pradeepnadig.in/#website",
      url: "https://pradeepnadig.in",
      name: "Pradeep Nadig - Kannada Purohit & Vedic Scholar",
      description:
        "Official website of Veda Brahma Shri Pradeep Nadig. Explore authentic Vedic rituals, Kannada purohit services near me, astrology consultations, chant workshops, and classes.",
      publisher: {
        "@id": "https://pradeepnadig.in/#person",
      },
    },
  ],
};

import { Suspense } from "react";
import NavigationProgress from "@/components/NavigationProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Providers>
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}

