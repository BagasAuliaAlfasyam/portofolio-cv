import type { MetadataRoute } from "next";

const siteUrl = "https://ai-support.catalystforge.web.id";
const routes = ["", "/analytics", "/conversations", "/knowledge", "/settings"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: path ? 0.7 : 1,
    url: `${siteUrl}${path}`,
  }));
}
