import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = { title: "AI Support — Catalyst Forge", description: "AI Customer Support Agent by Catalyst Forge" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
