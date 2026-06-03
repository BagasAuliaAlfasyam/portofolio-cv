import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/lib/service-pages";

const siteUrl = "https://catalystforge.web.id";
const lastModified = new Date();

const routes = [
  { path: "", priority: 1 },
  { path: "/en", priority: 0.9 },
  { path: "/products", priority: 0.8 },
  { path: "/process", priority: 0.7 },
  { path: "/testimonials", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/en/products", priority: 0.7 },
  { path: "/en/process", priority: 0.6 },
  { path: "/en/testimonials", priority: 0.6 },
  { path: "/en/contact", priority: 0.7 },
  ...serviceSlugs.map((slug) => ({
    path: `/${slug}`,
    priority: 0.85,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    changeFrequency: "weekly",
    lastModified,
    priority: route.priority,
    url: `${siteUrl}${route.path}`,
  }));
}
