import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://masaruae.com";
  const currentDate = new Date();

  const routes = [
    "",
    "/universities",
    "/muadala",
    "/cv-builder",
    "/coach",
    "/pricing",
    "/privacy",
    "/terms",
    "/disclaimer",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" || route === "/universities" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/universities" || route === "/muadala" ? 0.9 : 0.7,
  }));
}
