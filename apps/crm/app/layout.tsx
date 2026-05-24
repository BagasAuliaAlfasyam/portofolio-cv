import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://crm.catalystforge.web.id"),
  title: {
    default: "Catalyst CRM | Sales Pipeline Demo",
    template: "%s | Catalyst CRM",
  },
  description:
    "CRM demo untuk pipeline deal, account management, follow-up activity, dan sales reporting dari CatalystForge.",
  keywords: [
    "CRM Indonesia",
    "sales pipeline",
    "deal management",
    "customer relationship management",
    "CatalystForge",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Catalyst CRM | Sales Pipeline Demo",
    description:
      "Demo CRM profesional untuk pipeline, accounts, tasks, dan sales reports.",
    url: "https://crm.catalystforge.web.id",
    siteName: "Catalyst CRM",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Catalyst CRM | Sales Pipeline Demo",
    description:
      "Pipeline, accounts, follow-up, dan reporting untuk tim sales.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
