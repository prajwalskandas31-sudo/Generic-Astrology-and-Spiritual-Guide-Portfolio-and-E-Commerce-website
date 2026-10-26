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
      // Redirect consultations routes to /services (services & consultations unified)
      // NOTE: Google ignores URL fragments (#), so redirect to /services directly
      {
        source: "/consultation",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/consultations",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/consultation/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/consultations/:slug",
        destination: "/services/:slug",
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
      // 404s reported in Search Console (Oct 2026): live events linked under /services,
      // workshops linked under /live-events, and fallback-only workshop pages that
      // duplicate an existing course.
      {
        source: "/services/thread-art-live-event",
        destination: "/live-events/thread-art-live-event",
        permanent: true,
      },
      {
        source: "/services/solar-eclipse-shanti-pooja",
        destination: "/live-events/solar-eclipse-shanti-pooja",
        permanent: true,
      },
      {
        source: "/live-events/vedic-chanting-sukta-recitation-workshop",
        destination: "/workshops/vedic-chanting-suktas-recitation-workshop",
        permanent: true,
      },
      {
        source: "/workshops/vedic-chanting-sukta-recitation-workshop",
        destination: "/workshops/vedic-chanting-suktas-recitation-workshop",
        permanent: true,
      },
      {
        source: "/:prefix(live-events|workshops)/rangoli-art-design-workshop",
        destination: "/courses/rangoli-art-sacred-geometry",
        permanent: true,
      },
      {
        source: "/:prefix(live-events|workshops)/chakra-aura-healing-workshop",
        destination: "/courses/chakra-aura-healing-certification",
        permanent: true,
      },
      {
        source: "/workshops/simple-meditation-mindfulness-workshop",
        destination: "/courses/simple-meditation-mindfulness-practice",
        permanent: true,
      },
      {
        source: "/workshops/hypnotherapy-reiki-spirit-release-workshop",
        destination: "/courses/reiki-hypnosis-spirit-release-training",
        permanent: true,
      },
      {
        source: "/workshops/pendulum-dowsing-energy-diagnostics",
        destination: "/courses/pendulum-dowsing-radiesthesia-masterclass",
        permanent: true,
      },
      {
        source: "/workshops/vastu-energy-balancing-workshop",
        destination: "/courses/vastu-shastra-energy-healing",
        permanent: true,
      },
      {
        source: "/workshops/ganesha-idol-making-workshop-2026",
        destination: "/workshops",
        permanent: true,
      },
      // Legacy routes discovered by Googlebot — proper 301 redirects
      {
        source: "/reviews",
        destination: "/feedback",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

