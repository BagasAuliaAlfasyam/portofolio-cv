import type { MetadataRoute } from "next";

const siteUrl = "https://hris.catalystforge.web.id";
const routes = [
  "",
  "/attendance",
  "/employees",
  "/payroll",
  "/performance",
  "/settings",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: path ? 0.7 : 1,
    url: `${siteUrl}${path}`,
  }));
}
