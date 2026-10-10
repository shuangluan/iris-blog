import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getAllPosts,
  getPost,
  getTranslation
} from "@/lib/posts";
import { Mdx } from "@/lib/mdx";
import { t, formatDate, readingLabel, HREFLANG } from "@/lib/i18n";
import { getLang } from "@/lib/lang-server";
import { SITE_NAME, absoluteUrl, jsonLd, personSchema } from "@/lib/site";
import Comments from "@/components/Giscus";
import TipJar from "@/components/TipJar";
import ShareButtons from "@/components/ShareButtons";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found" };
  const translation = getTranslation(post);
  const path = `/posts/${post.slug}`;
  // hreflang links: also read by the language toggle to jump to the translation
  const languages: Record<string, string> = { [HREFLANG[post.lang]]: path };
  if (translation) {
    languages[HREFLANG[translation.lang]] = `/posts/${translation.slug}`;
    // English is the site default, so it's the fallback for other locales
    languages["x-default"] = post.lang === "en" ? path : `/posts/${translation.slug}`;
  }
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: "Iris Luan", url: absoluteUrl("/about") }],
    alternates: {
      canonical: path,
      languages,
      types: { "application/rss+xml": "/rss.xml" }
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: path,
      siteName: SITE_NAME,
      type: "article",
      locale: post.lang === "zh" ? "zh_CN" : "en_US",
      ...(translation
        ? { alternateLocale: translation.lang === "zh" ? "zh_CN" : "en_US" }
        : {}),
      publishedTime: post.date,
      authors: [absoluteUrl("/about")],
      section: t("en").categories[post.category],
      tags: post.tags
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@iris_ls_luan"
    }
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const lang = getLang();
  const d = t(lang);
  const translation = getTranslation(post);

  // prev/next walk the list in this post's own language
  const all = getAllPosts(post.lang);
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx >= 0 ? all[idx + 1] : undefined;
  const next = idx > 0 ? all[idx - 1] : undefined;

  const url = absoluteUrl(`/posts/${post.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: post.lang === "zh" ? "zh-CN" : "en",
        articleSection: t("en").categories[post.category],
        keywords: post.tags.join(", "),
        author: personSchema,
        publisher: personSchema,
        ...(translation
          ? { workTranslation: { "@id": `${absoluteUrl(`/posts/${translation.slug}`)}#article` } }
          : {})
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Writing", item: absoluteUrl("/posts") },
          { "@type": "ListItem", position: 3, name: post.title, item: url }
        ]
      }
    ]
  };

  return (
    <article className="max-w-2xl mx-auto" lang={post.lang === "zh" ? "zh-CN" : "en"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <div className="mb-8 text-sm flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/posts"
          className="text-ink-500 hover:text-ink-900 underline decoration-lilac-200 underline-offset-4"
        >
          {d.post.back}
        </Link>
        {translation ? (
          <Link href={`/posts/${translation.slug}`} className="chip">
            {t(post.lang).post.alsoIn}
          </Link>
        ) : null}
      </div>

      {!translation && post.lang !== lang ? (
        <div className="mb-8 glass rounded-2xl px-5 py-3 text-sm text-ink-500">
          {d.post.onlyIn}
        </div>
      ) : null}

      <header className="mb-10">
        <Link href={`/posts#${post.category}`} className="chip mb-5">
          {d.categories[post.category]}
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink-900 leading-[1.05]">
          {post.title}
        </h1>
        <p className="mt-5 text-lg text-ink-500 leading-relaxed">
          {post.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-300">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-blush-400 to-lilac-400" />
            <Link href="/about" rel="author" className="text-ink-500 hover:text-ink-900">
              Iris Luan
            </Link>
          </span>
          <span>·</span>
          <time dateTime={post.date}>{formatDate(post.date, lang, "long")}</time>
          <span>·</span>
          <span>{readingLabel(post.readingMinutes, lang)}</span>
        </div>
      </header>

      <div className="prose-soft">
        <Mdx source={post.content} />
      </div>

      {post.tags?.length ? (
        <div className="mt-12 pt-6 border-t border-lilac-200/40 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="chip">
              #{tag}
            </Link>
          ))}
        </div>
      ) : null}

      <ShareButtons
        url={url}
        title={post.title}
        description={post.description}
        lang={lang}
      />

      <TipJar lang={lang} />

      {/* prev/next */}
      <div className="grid gap-3 sm:grid-cols-2 mt-12">
        {prev ? (
          <Link
            href={`/posts/${prev.slug}`}
            className="no-underline glass rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-softLg transition-all block"
          >
            <div className="text-xs uppercase tracking-widest text-lilac-600 mb-1">
              {d.post.prev}
            </div>
            <div className="font-medium text-ink-900 text-sm">{prev.title}</div>
          </Link>
        ) : <div />}
        {next ? (
          <Link
            href={`/posts/${next.slug}`}
            className="no-underline glass rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-softLg transition-all block sm:text-right"
          >
            <div className="text-xs uppercase tracking-widest text-blush-600 mb-1">
              {d.post.next}
            </div>
            <div className="font-medium text-ink-900 text-sm">{next.title}</div>
          </Link>
        ) : <div />}
      </div>

      {/* Comments */}
      <section className="mt-16">
        <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900 mb-5">
          {d.post.comments}
        </h2>
        <Comments lang={lang} />
      </section>
    </article>
  );
}
