import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@/components/analytics";
import { UtmCapture } from "@/components/utm-capture";
import "./globals.css";

const siteUrl = "https://catalystforge.web.id";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CatalystForge | Solusi Digital Terpadu",
    template: "%s | CatalystForge",
  },
  description:
    "CatalystForge membangun company profile, CRM, HRIS, POS, AI support, dashboard, dan sistem operasional untuk bisnis Indonesia.",
  keywords: [
    "CatalystForge",
    "company profile",
    "software house Indonesia",
    "CRM",
    "HRIS",
    "POS",
    "AI automation",
  ],
  alternates: {
    canonical: "/",
    languages: {
      id: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "CatalystForge | Solusi Digital Terpadu",
    description:
      "Partner teknologi untuk website korporat, sistem operasional, dashboard, dan otomasi AI.",
    images: [
      {
        alt: "CatalystForge digital solution services",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    locale: "id_ID",
    url: siteUrl,
    siteName: "CatalystForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CatalystForge | Solusi Digital Terpadu",
    description:
      "Company profile, CRM, HRIS, POS, AI support, dan sistem operasional bisnis.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: [
      {
        url: "/logo_icon_only.png",
        type: "image/png",
      },
    ],
    shortcut: "/logo_icon_only.png",
    apple: "/logo_icon_only.png",
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bandung",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  areaServed: "Indonesia",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "catalystforgetechnology@gmail.com",
      telephone: "+6285121379282",
      availableLanguage: ["id", "en"],
    },
  ],
  description:
    "CatalystForge membangun company profile, CRM, HRIS, POS, AI support, dashboard, dan sistem operasional untuk bisnis Indonesia.",
  email: "catalystforgetechnology@gmail.com",
  logo: `${siteUrl}/logo_icon_only.png`,
  name: "CatalystForge",
  sameAs: [
    "https://company.catalystforge.web.id",
    "https://crm.catalystforge.web.id",
    "https://hris.catalystforge.web.id",
    "https://pos.catalystforge.web.id",
    "https://ai.catalystforge.web.id",
  ],
  url: siteUrl,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  inLanguage: ["id-ID", "en"],
  name: "CatalystForge",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
        <UtmCapture />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
