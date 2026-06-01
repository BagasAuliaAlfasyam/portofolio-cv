import type { MetadataRoute } from "next";

const siteUrl = "https://pos.catalystforge.web.id";
const routes = [
  "",
  "/inventory",
  "/reports",
  "/sale",
  "/settings",
  "/transactions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: path ? 0.7 : 1,
    url: `${siteUrl}${path}`,
  }));
}
