import type { Metadata } from "next";
import { DemoLeadBar } from "@repo/ui/demo-lead-bar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://company.catalystforge.web.id"),
  title: {
    default: "Company Profile Demo | CatalystForge",
    template: "%s | Company Profile Demo",
  },
  description:
    "Company profile perkebunan dan pengolahan sawit berkelanjutan dengan fokus operasi, kemitraan, tata kelola, dan ESG.",
  keywords: [
    "Company Profile",
    "Perkebunan Sawit",
    "Sumber Daya Alam",
    "ESG",
    "Keberlanjutan",
    "Tata Kelola",
    "Catalyst Forge",
  ],
  openGraph: {
    title: "Company Profile Demo | CatalystForge",
    description:
      "Showcase company profile untuk perusahaan perkebunan dan pengolahan sawit.",
    images: ["https://catalystforge.web.id/opengraph-image"],
    url: "https://company.catalystforge.web.id",
    siteName: "PT Sawit Lestari Nusantara",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Company Profile Demo | CatalystForge",
    description:
      "Showcase company profile untuk profil perusahaan modern dan kredibel.",
    images: ["https://catalystforge.web.id/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        {children}
        <DemoLeadBar
          appName="Company Profile"
          message="Demo company profile ini bisa disesuaikan untuk industri, layanan, portofolio, ESG, dan kebutuhan lead capture perusahaan Anda."
        />
      </body>
    </html>
  );
}
