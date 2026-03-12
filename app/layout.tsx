import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, SITE_NAME, PAGE_SEO } from "@/lib/seo";
import { OrganizationJsonLd } from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_SEO.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: PAGE_SEO.home.description,
  keywords:
    "newland, colegio, school, querétaro, educación, education, maternal, kinder, primaria, secundaria, preparatoria, bilingual, bilingüe, san miguel de allende",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_MX",
    siteName: SITE_NAME,
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    url: SITE_URL,
    images: [
      {
        url: PAGE_SEO.home.ogImage,
        width: 1200,
        height: 630,
        alt: "Newland School — Bilingual private school in Querétaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    images: [PAGE_SEO.home.ogImage],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en": SITE_URL,
      "es": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <OrganizationJsonLd />
        {children}
        <Script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_f326b262f9234006b24833e8cfb32b39"
          strategy="afterInteractive"
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
