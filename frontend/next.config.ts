import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      // 301 Permanent Redirects for legacy and consolidated URLs
      {
        source: "/live-events",
        destination: "/events",
        permanent: true,
      },
      {
        source: "/services/vedic-astrology-consultation",
        destination: "/consultations/vedic-astrology-consultation",
        permanent: true,
      },
      {
        source: "/consultations/janma-kundali-birth-chart-reading",
        destination: "/consultations/vedic-astrology-consultation",
        permanent: true,
      },
      {
        source: "/consultations/marriage-matching-kundali-milan",
        destination: "/consultations/vedic-astrology-consultation",
        permanent: true,
      },
      {
        source: "/consultations/career-business-astrology",
        destination: "/consultations/vedic-astrology-consultation",
        permanent: true,
      },
      {
        source: "/consultations/gemstone-rudraksha-recommendation",
        destination: "/consultations/vedic-astrology-consultation",
        permanent: true,
      },
      {
        source: "/consultations/prashna-marga-horary-astrology",
        destination: "/consultations/vedic-astrology-consultation",
        permanent: true,
      },
      {
        source: "/services/consultations",
        destination: "/consultations",
        permanent: true,
      },
      {
        source: "/services/classes",
        destination: "/classes",
        permanent: true,
      },
      {
        source: "/services/courses",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/services/workshops",
        destination: "/workshops",
        permanent: true,
      },
      {
        source: "/services/events",
        destination: "/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

