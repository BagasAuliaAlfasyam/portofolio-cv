import type { Metadata } from "next";
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
    url: "https://company.catalystforge.web.id",
    siteName: "PT Sawit Lestari Nusantara",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Company Profile Demo | CatalystForge",
    description:
      "Showcase company profile untuk profil perusahaan modern dan kredibel.",
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
      </body>
    </html>
  );
}
