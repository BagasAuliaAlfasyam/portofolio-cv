import type { Metadata } from "next";
import type { ServicePage } from "@/lib/service-pages";

const siteUrl = "https://catalystforge.web.id";

export function createServicePageMetadata(page: ServicePage): Metadata {
  const url = `${siteUrl}/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: `${page.metaTitle} | CatalystForge`,
      description: page.description,
      images: [
        {
          alt: `${page.metaTitle} CatalystForge`,
          height: 630,
          url: "/opengraph-image",
          width: 1200,
        },
      ],
      locale: "id_ID",
      siteName: "CatalystForge",
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | CatalystForge`,
      description: page.description,
      images: ["/twitter-image"],
    },
  };
}
