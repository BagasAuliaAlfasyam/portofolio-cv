import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pos.catalystforge.web.id"),
  title: {
    default: "Catalyst POS | Cashier System Demo",
    template: "%s | Catalyst POS",
  },
  description:
    "POS demo untuk cashier checkout, product catalog, receipt summary, inventory, transaksi, dan daily sales report.",
  keywords: [
    "POS Indonesia",
    "cashier system",
    "point of sale",
    "inventory POS",
    "CatalystForge",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Catalyst POS | Cashier System Demo",
    description:
      "Demo POS modern untuk kasir, katalog produk, receipt, inventory, dan laporan penjualan.",
    url: "https://pos.catalystforge.web.id",
    siteName: "Catalyst POS",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Catalyst POS | Cashier System Demo",
    description:
      "Cashier checkout, product catalog, receipt summary, dan daily sales report.",
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
