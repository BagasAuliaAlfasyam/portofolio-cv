import type { Metadata } from "next";
import { DemoLeadBar } from "@repo/ui/demo-lead-bar";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-support.catalystforge.web.id"),
  title: {
    default: "AI Support Demo | CatalystForge",
    template: "%s | AI Support Demo",
  },
  description:
    "AI customer support demo untuk chatbot, ticket triage, knowledge base, dan customer service automation.",
  keywords: [
    "AI support",
    "chatbot Indonesia",
    "customer service automation",
    "AI agent",
    "CatalystForge",
  ],
  openGraph: {
    title: "AI Support Demo | CatalystForge",
    description:
      "Demo AI support untuk chatbot, ticket triage, dan customer service automation.",
    images: ["https://catalystforge.web.id/opengraph-image"],
    url: "https://ai-support.catalystforge.web.id",
    siteName: "AI Support Demo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Support Demo | CatalystForge",
    description:
      "Chatbot, ticket triage, knowledge base, dan customer support automation.",
    images: ["https://catalystforge.web.id/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col antialiased">
        <Providers>{children}</Providers>
        <DemoLeadBar appName="AI Support Hub" />
      </body>
    </html>
  );
}
