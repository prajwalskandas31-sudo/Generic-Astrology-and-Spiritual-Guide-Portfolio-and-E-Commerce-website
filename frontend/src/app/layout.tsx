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
    title: "Veda Brahma Shri Pradeep Nadig | Vedic Scholar & Spiritual Guide",
    description:
      "Official website of Veda Brahma Shri Pradeep Nadig. Explore authentic Vedic rituals, astrology consultations, chant workshops, classes, and spiritual guidance.",
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
    title: "Veda Brahma Shri Pradeep Nadig | Vedic Scholar & Spiritual Guide",
    description:
      "Official website of Veda Brahma Shri Pradeep Nadig. Explore authentic Vedic rituals, consultations, and classes.",
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
      description:
        "Vedic Scholar, Spiritual Guide, and practitioner providing authentic Vedic rituals, consultations, chant workshops, and classes.",
    },
    {
      "@type": "WebSite",
      "@id": "https://pradeepnadig.in/#website",
      url: "https://pradeepnadig.in",
      name: "Pradeep Nadig - Vedic Scholar & Spiritual Guide",
      description:
        "Official website of Veda Brahma Shri Pradeep Nadig. Explore authentic Vedic rituals, astrology consultations, chant workshops, classes, and spiritual insights.",
      publisher: {
        "@id": "https://pradeepnadig.in/#person",
      },
    },
  ],
};

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
