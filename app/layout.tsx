import type { Metadata } from "next";
import { Gabarito, Spline_Sans_Mono } from "next/font/google";
import Script from "next/script";
import { SITE_URL, SITE_NAME, PAGE_SEO } from "@/lib/seo";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import MetaTracking from "@/components/MetaTracking";
import UTMCapture from "@/components/UTMCapture";
import "./globals.css";

// Gabarito — the official NWL Australian School brand typeface (display → body).
const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-brand",
});

// Spline Sans Mono — uppercase eyebrows, labels, coordinates micro-type.
const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_SEO.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: PAGE_SEO.home.description,
  keywords:
    "nwl australian school, newland, colegio, school, querétaro, educación, education, modelo australiano, australian model, australian curriculum, colegio australiano, maternal, kinder, primaria, secundaria, preparatoria, bilingual, bilingüe, san miguel de allende",
  openGraph: {
    type: "website",
    locale: "es_MX",
    alternateLocale: "en_US",
    siteName: SITE_NAME,
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    url: SITE_URL,
    images: [
      {
        url: PAGE_SEO.home.ogImage,
        width: 1200,
        height: 630,
        alt: "NWL Australian School — Bilingual private school in Querétaro",
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
  },
  verification: {
    other: {
      "facebook-domain-verification": "aa9h78aazssfthr69ntgl9uemnfqw2",
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
    // suppressHydrationWarning: the hero A/B script stamps data-hero-variant pre-hydration
    <html lang="es" className={`${gabarito.variable} ${splineMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {/* Hero image A/B test — sticky per-visitor variant (a = dawn gradient, b = photo).
            Runs synchronously before first paint so the wrong hero never flashes; tags the
            session in Clarity (custom tag) and GA4 (user property) for the analysis. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  var v;
  try {
    v = localStorage.getItem('nwl_hero_variant');
    if (v !== 'a' && v !== 'b') {
      v = Math.random() < 0.5 ? 'a' : 'b';
      localStorage.setItem('nwl_hero_variant', v);
    }
  } catch (e) { v = 'a'; }
  document.documentElement.setAttribute('data-hero-variant', v);
  if (v === 'b') {
    var l = document.createElement('link');
    l.rel = 'preload'; l.as = 'image'; l.fetchPriority = 'high';
    l.href = window.matchMedia('(min-width: 768px)').matches
      ? '/images/hero/nwl-alumnos-kinder-circulo-paises-1920.jpg'
      : '/images/hero/nwl-alumnos-kinder-circulo-paises-movil.jpg';
    document.head.appendChild(l);
  }
  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  window.clarity('set', 'hero_variant', v);
  window.dataLayer = window.dataLayer || [];
  function g() { window.dataLayer.push(arguments); }
  g('set', 'user_properties', { hero_variant: v });
})();`,
          }}
        />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {/* Attribution capture lives in the ROOT layout, not (main): the SEO
            /informacion pages, /campus, /padres and /brochures are ad and
            search landing pages, and previously none of them persisted the
            inbound utm_* / fbclid at all. */}
        <UTMCapture />
        <MetaTracking />
        {children}
        {/* Google Ads + GA4 (shared gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17936345870"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17936345870');
            gtag('config', 'G-0D697PBCB2');
          `}
        </Script>
        {/* Meta (Facebook) Pixel — browser side. CAPI server side fires from /api/meta-capi.
            Gated to the production hostname: preview deployments
            (nwl-landing*.vercel.app) and localhost were sending live traffic
            into the dataset. Mirror of META_HOST_RE in lib/meta-pixel.ts. */}
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            if (/(^|\\.)nwl\\.com\\.mx$/.test(location.hostname)) {
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
            }
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* Microsoft Clarity — heatmaps & session recordings */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vzk7hjr2xk");
          `}
        </Script>
        <Script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_f326b262f9234006b24833e8cfb32b39"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
