import type { MetadataRoute } from "next";

const siteUrl = "https://company.catalystforge.web.id";
const routes = [
  "",
  "/about",
  "/contact",
  "/governance",
  "/operations",
  "/sustainability",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: path ? 0.7 : 1,
    url: `${siteUrl}${path}`,
  }));
}
