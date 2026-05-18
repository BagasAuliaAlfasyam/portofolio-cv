import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "CRM — Catalyst Forge", description: "Customer Relationship Management by Catalyst Forge" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className="dark"><body className="min-h-screen antialiased">{children}</body></html>);
}
