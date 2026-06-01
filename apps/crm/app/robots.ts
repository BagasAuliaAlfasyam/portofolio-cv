import type { MetadataRoute } from "next";

const siteUrl = "https://crm.catalystforge.web.id";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: "/", userAgent: "*" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
