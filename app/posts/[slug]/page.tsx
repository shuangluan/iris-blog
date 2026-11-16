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
import { stripDuplicateDek, textLang, titleClass } from "@/lib/text";
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
  const languages: Record<string, string> = { [HREFLANG[post.lang]]: path };
  if (translation) {
    languages[HREFLANG[translation.lang]] = `/posts/${translation.slug}`;
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
  const postLang = post.lang;

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
          { "@type": "ListItem", position: 2, name: "Writing", item: absoluteUrl("/writing") },
          { "@type": "ListItem", position: 3, name: post.title, item: url }
        ]
      }
    ]
  };

  const tags = [post.category, ...post.tags.filter((tag) => tag !== post.category)];

  return (
    <article className="page" lang={post.lang === "zh" ? "zh-CN" : "en"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <div className="article-top">
        <Link href="/writing">{d.post.back}</Link>
        {translation ? (
          <Link href={`/posts/${translation.slug}`}>{t(postLang).post.alsoIn}</Link>
        ) : null}
      </div>

      {!translation && post.lang !== lang ? <p className="notice">{d.post.onlyIn}</p> : null}

      <header className="article-header">
        {tags.length ? (
          <p className="tag-row">
            {tags.map((tag) => (
              <Link key={tag} href={`/writing?tag=${encodeURIComponent(tag)}`}>
                {tag in d.categories ? d.categories[tag as keyof typeof d.categories] : tag}
              </Link>
            ))}
          </p>
        ) : null}
        <h1 className={titleClass("page-title", post.title)} lang={textLang(post.title, postLang)}>
          {post.title}
        </h1>
        {post.description ? (
          <p className={titleClass("dek", post.description)} lang={textLang(post.description, postLang)}>
            {post.description}
          </p>
        ) : null}
        <p className="byline">
          <Link href="/about" rel="author">
            Iris Luan
          </Link>
          {" · "}
          <time dateTime={post.date}>{formatDate(post.date, lang, "long")}</time>
          {" · "}
          {readingLabel(post.readingMinutes, lang)}
        </p>
      </header>

      <div className="prose">
        <Mdx source={stripDuplicateDek(post.content, post.description)} />
      </div>

      {post.tags?.length ? (
        <p className="tag-row" style={{ marginTop: "var(--space-6)" }}>
          {post.tags.map((tag) => (
            <Link key={tag} href={`/writing?tag=${encodeURIComponent(tag)}`}>
              {tag}
            </Link>
          ))}
        </p>
      ) : null}

      <ShareButtons url={url} title={post.title} description={post.description} lang={lang} />

      <TipJar lang={lang} />

      <div className="pager">
        {prev ? (
          <Link href={`/posts/${prev.slug}`} rel="prev">
            <span className="pager-kicker">{d.post.prev}</span>
            <span className={titleClass("pager-title", prev.title)}>{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/posts/${next.slug}`} rel="next" className="pager-next">
            <span className="pager-kicker">{d.post.next}</span>
            <span className={titleClass("pager-title", next.title)}>{next.title}</span>
          </Link>
        ) : null}
      </div>

      <section style={{ marginTop: "var(--space-8)" }}>
        <h2 className="section-title">{d.post.comments}</h2>
        <Comments lang={lang} />
      </section>
    </article>
  );
}
