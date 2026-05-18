import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "POS — Catalyst Forge", description: "Point of Sale System by Catalyst Forge" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className="dark"><body className="min-h-screen antialiased">{children}</body></html>);
}
