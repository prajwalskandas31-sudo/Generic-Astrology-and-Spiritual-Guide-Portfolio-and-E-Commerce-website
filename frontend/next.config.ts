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
      // Singular /consultation route canonical mapping
      {
        source: "/consultation",
        destination: "/consultations",
        permanent: true,
      },
      {
        source: "/consultation/:slug",
        destination: "/consultations/:slug",
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
        source: "/meditation",
        destination: "/workshops/meditation",
        permanent: true,
      },
      {
        source: "/live-events/solar-grahan-shanti-havan-august-2026",
        destination: "/live-events/solar-eclipse-shanti-pooja",
        permanent: true,
      },
      {
        source: "/live-events/pradosham-shanti-rudrabhishekam-2026",
        destination: "/live-events/monthly-pradosham-rudrabhishekam",
        permanent: true,
      },
      {
        source: "/live-events/navratri-satsang",
        destination: "/live-events/navratri-chandi-homa-live",
        permanent: true,
      },
      {
        source: "/services/events",
        destination: "/events",
        permanent: true,
      },
      // Legacy live-events & test URLs discovered by Googlebot
      {
        source: "/live-events/vedic-chanting-suktas-recitation-workshop",
        destination: "/workshops/vedic-chanting-suktas-recitation-workshop",
        permanent: true,
      },
      {
        source: "/live-events/vedic-chant-mastery-august-2026",
        destination: "/courses/sacred-vedic-chanting-mastery",
        permanent: true,
      },
      {
        source: "/live-events/ganesha-idol-making-workshop-2026",
        destination: "/events",
        permanent: true,
      },
      {
        source: "/live-events/test-workshop",
        destination: "/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

