import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://catalystforge.web.id"),
  icons: {
    icon: [
      {
        url: "/logo_icon_only.png",
        type: "image/png",
      },
    ],
    shortcut: "/logo_icon_only.png",
    apple: "/logo_icon_only.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
