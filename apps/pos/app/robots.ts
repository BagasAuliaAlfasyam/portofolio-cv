import type { MetadataRoute } from "next";

const siteUrl = "https://pos.catalystforge.web.id";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: "/", userAgent: "*" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
