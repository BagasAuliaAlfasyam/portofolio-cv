import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catalyst Forge — AI-Powered Digital Products That Scale",
  description:
    "Catalyst Forge builds scalable SaaS products, AI-powered systems, enterprise-grade applications, and cloud-native solutions on Google Cloud Platform.",
  keywords: [
    "AI",
    "SaaS",
    "Machine Learning",
    "LLM",
    "Cloud Native",
    "GCP",
    "Next.js",
    "FastAPI",
  ],
  openGraph: {
    title: "Catalyst Forge — AI-Powered Digital Products That Scale",
    description:
      "We build scalable SaaS products and AI-powered systems for enterprises.",
    url: "https://catalystforge.id",
    siteName: "Catalyst Forge",
    type: "website",
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
