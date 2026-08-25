import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pradeepnadig.in";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/consultations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/live-events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/classes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/workshops`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cancellation-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceSlugs = [
    "ganapathi-homa",
    "navagraha-homa",
    "mrityunjaya-homa",
    "naga-shanthi",
    "vastu-homa",
    "durga-homa",
    "chandika-homa",
    "ayushya-homa",
    "aghorastra-homa",
    "sudarshana-pooja",
    "satyanarayana-pooja",
    "saraswati-pooja",
    "mahalakshmi-kanakadhara-pooja",
    "lakshmi-narayana-hrudaya-homa",
    "sundarakanda-parayana-pooja",
    "swayamvara-parvathi-pooja",
    "durga-saptashati-pooja",
    "rudrabhishekam-pooja",
    "subrahmanya-homa",
  ];

  const consultationSlugs = [
    "vedic-astrology-consultation",
    "janma-kundali-birth-chart-reading",
    "marriage-matching-kundali-milan",
    "career-business-astrology",
    "gemstone-rudraksha-recommendation",
    "prashna-marga-horary-astrology",
  ];

  const liveEventSlugs = [
    "mahashivaratri-grand-night-2026",
    "navratri-chandi-homa-live",
    "solar-eclipse-shanti-pooja",
    "monthly-pradosham-rudrabhishekam",
  ];

  const courseSlugs = [
    "sacred-vedic-chanting-mastery",
    "vedic-astrology-foundation",
    "prashna-marga-horary-astrology",
    "vastu-shastra-energy-healing",
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const consultationRoutes: MetadataRoute.Sitemap = consultationSlugs.map((slug) => ({
    url: `${baseUrl}/consultations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const liveEventRoutes: MetadataRoute.Sitemap = liveEventSlugs.map((slug) => ({
    url: `${baseUrl}/live-events/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const courseRoutes: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...consultationRoutes,
    ...liveEventRoutes,
    ...courseRoutes,
  ];
}
