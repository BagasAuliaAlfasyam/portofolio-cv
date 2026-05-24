import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hris.catalystforge.web.id"),
  title: {
    default: "Catalyst HRIS | People Operations Demo",
    template: "%s | Catalyst HRIS",
  },
  description:
    "HRIS demo untuk employee management, attendance, leave, payroll, performance, dan struktur organisasi.",
  keywords: [
    "HRIS Indonesia",
    "employee management",
    "payroll system",
    "attendance system",
    "CatalystForge",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Catalyst HRIS | People Operations Demo",
    description:
      "Demo HRIS profesional untuk employee data, attendance, payroll, dan performance.",
    url: "https://hris.catalystforge.web.id",
    siteName: "Catalyst HRIS",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Catalyst HRIS | People Operations Demo",
    description:
      "Employee management, attendance, payroll, dan people analytics.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
