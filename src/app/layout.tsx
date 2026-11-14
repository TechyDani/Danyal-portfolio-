import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Danyal Khan® — Creative Director & Multidisciplinary Creative",
    template: "%s — Danyal Khan®",
  },
  description:
    "Ideas into experiences. Danyal Khan connects creative direction, design, motion, strategy, and web development. Based in Islamabad. Working across borders.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Danyal Khan",
    title: "Danyal Khan — Ideas into experiences",
    description:
      "Creative direction, design, motion, strategy & digital experiences.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Grammarly can inject body attributes before React hydrates. */}
      <body id="top" suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
