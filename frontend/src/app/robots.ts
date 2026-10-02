import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*", "/reviews"],
      },
    ],
    sitemap: "https://pradeepnadig.in/sitemap.xml",
    host: "https://pradeepnadig.in",
  };
}
