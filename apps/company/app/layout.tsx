import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT Sawit Lestari Nusantara | Company Profile by Catalyst Forge",
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
    title: "PT Sawit Lestari Nusantara | Company Profile",
    description:
      "Showcase company profile untuk perusahaan perkebunan dan pengolahan sawit.",
    url: "https://company.catalystforge.id",
    siteName: "PT Sawit Lestari Nusantara",
    type: "website",
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
