import type { MetadataRoute } from "next";

const siteUrl = "https://crm.catalystforge.web.id";
const routes = [
  "",
  "/accounts",
  "/pipeline",
  "/reports",
  "/settings",
  "/tasks",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: path ? 0.7 : 1,
    url: `${siteUrl}${path}`,
  }));
}
