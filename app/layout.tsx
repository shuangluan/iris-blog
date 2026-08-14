import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#fff9f2",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://irisluan.com"
  ),
  title: {
    default: "Iris Luan",
    template: "%s · Iris Luan"
  },
  description:
    "Notes, case studies, travel journals, and side products by Iris Luan. Writing from somewhere between Shanghai and New York City.",
  openGraph: {
    title: "Iris Luan",
    description:
      "Notes, case studies, travel, and side products.",
    type: "website"
  },
  twitter: { card: "summary_large_image" }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fraunces:opsz,wght,SOFT@9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col pt-3">
        <Nav />
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        {plausibleDomain ? (
          <>
            <Script
              async
              src="https://plausible.io/js/pa-XK2kJd2nFeJH_dVYfpkbX.js"
              strategy="afterInteractive"
            />
            <Script
              id="plausible-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`,
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
