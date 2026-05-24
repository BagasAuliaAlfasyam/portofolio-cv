import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://catalystforge.web.id"),
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
    url: "https://catalystforge.web.id",
    siteName: "CatalystForge",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CatalystForge | Solusi Digital Terpadu",
    description:
      "Company profile, CRM, HRIS, POS, AI support, dan sistem operasional bisnis.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
