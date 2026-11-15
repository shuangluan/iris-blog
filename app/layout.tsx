import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import { Source_Serif_4, Source_Sans_3, Source_Code_Pro } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getLang } from "@/lib/lang-server";
import { getPost } from "@/lib/posts";
import type { Lang } from "@/lib/i18n";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

// Static 400/600. This Next.js font build rejects `axes` unless the face is
// requested as a variable font, which would pull every weight. opsz stays off.
const serif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
  adjustFontFallback: true,
  preload: true
});

const sans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: "normal",
  variable: "--font-source-sans",
  display: "swap",
  adjustFontFallback: true,
  preload: true
});

const mono = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: "normal",
  variable: "--font-source-code",
  display: "swap",
  preload: false,
  adjustFontFallback: true
});

const serifSc = localFont({
  src: [
    { path: "../public/fonts/NotoSerifSC-subset-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/NotoSerifSC-subset-600.woff2", weight: "600", style: "normal" }
  ],
  variable: "--font-noto-serif-sc",
  display: "swap",
  preload: false,
  adjustFontFallback: false
});

export const viewport: Viewport = {
  themeColor: "#f4f3f0",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Iris Luan", url: `${SITE_URL}/about` }],
  creator: "Iris Luan",
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US"
  },
  twitter: { card: "summary_large_image", creator: "@iris_ls_luan" },
  icons: { icon: "/favicon.svg" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined
  }
};

/**
 * Page language: an article uses the post's language; every other page uses
 * the UI cookie. The nav follows this, so a Chinese post shows 首页 / 文章 / …
 */
function pageLang(uiLang: Lang, pathname: string): Lang {
  const m = pathname.match(/^\/posts\/([^/]+)$/);
  if (!m) return uiLang;
  const post = getPost(decodeURIComponent(m[1]));
  return post?.lang ?? uiLang;
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const lang = getLang();
  const pathname = headers().get("x-pathname") ?? "/";
  const search = headers().get("x-search") ?? "";
  const navLang = pageLang(lang, pathname);
  const home = pathname === "/";
  return (
    <html
      lang={navLang === "zh" ? "zh-CN" : "en"}
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${serifSc.variable}`}
    >
      <body>
        <Nav lang={navLang} pathname={pathname} from={`${pathname}${search}`} />
        <main className={home ? "site-main" : "site-main site-main-page"}>{children}</main>
        <Footer lang={lang} />
        <Analytics />
        <SpeedInsights />
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
