import type { Metadata } from "next";

// The host Vercel actually serves (irisluan.com 308-redirects here). Every
// canonical, hreflang, sitemap and OG URL must use it, or crawlers see each
// URL as a redirect instead of a page.
export const SITE_URL = "https://www.irisluan.com";
export const SITE_NAME = "Iris Luan";
export const SITE_DESCRIPTION =
  "Iris Luan writes about AI product management, case studies from 7.5 years at ByteDance / TikTok, GEO and SEO experiments, and life between Shanghai and New York.";

export const AUTHOR = {
  name: "Iris Luan",
  alternateName: "Shuang Luan",
  url: `${SITE_URL}/about`,
  jobTitle: "Independent AI product consultant",
  sameAs: [
    "https://x.com/iris_ls_luan",
    "https://www.linkedin.com/in/iris-luan",
    "https://github.com/shuangluan",
    "https://xhslink.cn/o/90fVn574k1y"
  ]
};

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Per-page metadata. Next replaces (not merges) a layout's openGraph/twitter
 * objects, so every page has to set its own or it inherits the homepage's.
 */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  locale = "en",
  noindex = false
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "profile";
  locale?: "en" | "zh";
  noindex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/rss.xml" }
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      // app/opengraph-image only attaches itself to the root segment
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: fullTitle }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"]
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {})
  };
}

/** Renders a JSON-LD block. `<` is escaped so content can't close the script tag. */
export function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c")
  };
}

export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: AUTHOR.name,
  alternateName: AUTHOR.alternateName,
  url: AUTHOR.url,
  jobTitle: AUTHOR.jobTitle,
  sameAs: AUTHOR.sameAs
};
