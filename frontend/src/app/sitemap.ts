import { MetadataRoute } from "next";
import { getOfferings, getWorkshops, getCourses, getLiveEvents, getBlogs } from "@/lib/api-client";

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

  const serviceRoutes: MetadataRoute.Sitemap = offeringsList
    .filter((item) => item.type === "Service" || item.type === "Pooja")
    .map((item) => ({
      url: `${baseUrl}/services/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const consultationRoutes: MetadataRoute.Sitemap = offeringsList
    .filter((item) => item.type === "Consultation")
    .map((item) => ({
      url: `${baseUrl}/consultations/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const workshopRoutes: MetadataRoute.Sitemap = workshopsList.map((item) => ({
    url: `${baseUrl}/workshops/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const courseRoutes: MetadataRoute.Sitemap = coursesList.map((item) => ({
    url: `${baseUrl}/courses/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const liveEventRoutes: MetadataRoute.Sitemap = liveEventsList.map((item) => ({
    url: `${baseUrl}/live-events/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogsList.map((item) => ({
    url: `${baseUrl}/blogs/${item.slug}`,
    lastModified: new Date(item.publish_date || Date.now()),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...consultationRoutes,
    ...workshopRoutes,
    ...courseRoutes,
    ...liveEventRoutes,
    ...blogRoutes,
  ];
}
