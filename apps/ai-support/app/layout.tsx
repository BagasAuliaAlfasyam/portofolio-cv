import type { Metadata } from "next";
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
    url: "https://ai-support.catalystforge.web.id",
    siteName: "AI Support Demo",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Support Demo | CatalystForge",
    description:
      "Chatbot, ticket triage, knowledge base, dan customer support automation.",
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
      </body>
    </html>
  );
}
