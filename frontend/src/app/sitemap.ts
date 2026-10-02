import { MetadataRoute } from "next";
import { getOfferings, getWorkshops, getCourses, getLiveEvents, getBlogs } from "@/lib/api-client";

/**
 * Generates the XML sitemap for pradeepnadig.in.
 *
 * IMPORTANT: lastModified dates must reflect meaningful content changes,
 * NOT the current time. Google ignores lastmod signals if they're always "now".
 * Static pages use a fixed date that should be updated when content actually changes.
 * Dynamic pages use their updated_at or created_at timestamps from the API.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pradeepnadig.in";

  // Fixed date for static pages — update this when static content actually changes
  const staticLastMod = new Date("2026-10-01T00:00:00Z");
  const legalLastMod = new Date("2026-09-01T00:00:00Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/classes`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/workshops`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: legalLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: legalLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cancellation-policy`,
      lastModified: legalLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: legalLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: legalLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  let offeringsList: any[] = [];
  let workshopsList: any[] = [];
  let coursesList: any[] = [];
  let liveEventsList: any[] = [];
  let blogsList: any[] = [];

  try {
    offeringsList = await getOfferings();
  } catch (_) {}

  try {
    workshopsList = await getWorkshops();
  } catch (_) {}

  try {
    coursesList = await getCourses();
  } catch (_) {}

  try {
    liveEventsList = await getLiveEvents();
  } catch (_) {}

  try {
    blogsList = await getBlogs();
  } catch (_) {}

  const serviceRoutes: MetadataRoute.Sitemap = offeringsList.map((item) => ({
    url: `${baseUrl}/services/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || staticLastMod),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const workshopRoutes: MetadataRoute.Sitemap = workshopsList.map((item) => ({
    url: `${baseUrl}/workshops/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || staticLastMod),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const courseRoutes: MetadataRoute.Sitemap = coursesList.map((item) => ({
    url: `${baseUrl}/courses/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || staticLastMod),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const liveEventRoutes: MetadataRoute.Sitemap = liveEventsList.map((item) => ({
    url: `${baseUrl}/live-events/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || staticLastMod),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogsList.map((item) => ({
    url: `${baseUrl}/blogs/${item.slug}`,
    lastModified: new Date(item.publish_date || item.updated_at || item.created_at || staticLastMod),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...workshopRoutes,
    ...courseRoutes,
    ...liveEventRoutes,
    ...blogRoutes,
  ];
}
