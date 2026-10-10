import Link from "next/link";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllPosts, type Category } from "@/lib/posts";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/lang-server";
import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  pageMeta,
  jsonLd,
  personSchema
} from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Iris Luan · AI product notes, case studies & side projects",
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true
});

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: ["en", "zh-CN"],
      publisher: { "@id": `${SITE_URL}/#person` }
    },
    personSchema
  ]
};

const cats: { key: Category; icon: string; from: string; to: string; text: string }[] = [
  { key: "notes", icon: "◐", from: "#fce4ec", to: "#efe9ff", text: "#7a5cb8" },
  { key: "case-study", icon: "◑", from: "#fef3e8", to: "#fce4ec", text: "#d1487a" },
  { key: "travel", icon: "◒", from: "#e9f4ff", to: "#efe9ff", text: "#4a6fb8" },
  { key: "life", icon: "◓", from: "#fef3e8", to: "#fbeaea", text: "#c66434" },
  { key: "side-project", icon: "✦", from: "#efe9ff", to: "#e9f4ff", text: "#6b3fb1" }
];

export default function HomePage() {
  const lang = getLang();
  const d = t(lang);
  const h = d.home;
  const posts = getAllPosts(lang);
  const [hero, ...rest] = posts;

  return (
    <div className="space-y-16 sm:space-y-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      {/* HERO */}
      <section className="pt-4 sm:pt-8">
        <span className="chip mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blush-400 to-lilac-400" />
          {h.chip}
        </span>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-ink-900 leading-[1.02] mb-6">
          {h.h1a}<br className="hidden sm:inline" />
          <span className="gradient-text italic">{h.h1b}</span>
        </h1>
        <p className="text-lg sm:text-xl text-ink-500 max-w-2xl leading-relaxed mb-8">
          {h.intro}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/posts" className="btn-primary">{h.start}</Link>
          <Link href="/about" className="btn-ghost">{h.aboutMe}</Link>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900">
            {h.find}
          </h2>
          <Link href="/tags" className="text-sm text-lilac-600 hover:text-ink-900">{h.allTags}</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cats.map((c) => {
            const count = posts.filter((p) => p.category === c.key).length;
            return (
              <Link
                key={c.key}
                href={`/posts#${c.key}`}
                className="no-underline group block rounded-3xl overflow-hidden glass hover:-translate-y-0.5 hover:shadow-softLg transition-all"
              >
                <div
                  className="h-16"
                  style={{
                    background: `linear-gradient(135deg, ${c.from} 0%, ${c.to} 100%)`
                  }}
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-sm font-medium tracking-wide"
                      style={{ color: c.text }}
                    >
                      {c.icon} {d.categories[c.key]}
                    </span>
                    <span className="text-xs text-ink-300">{count}</span>
                  </div>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {d.blurbs[c.key]}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HERO POST */}
      {hero ? (
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900 mb-6">
            {h.latest}
          </h2>
          <PostCard post={hero} featured lang={lang} />
        </section>
      ) : null}

      {/* RECENT */}
      {rest.length ? (
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900 mb-6">
            {h.more}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} lang={lang} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/posts" className="btn-ghost">{h.seeAll}</Link>
          </div>
        </section>
      ) : null}

      {/* NEWSLETTER */}
      <section className="glass-strong rounded-3xl px-6 sm:px-10 py-10 sm:py-12 text-center">
        <span className="chip mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-peach-400 to-blush-400" />
          {h.nlChip}
        </span>
        <h3 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink-900 mb-3">
          {h.nlTitleA} <span className="gradient-text italic">{h.nlTitleB}</span>
        </h3>
        <p className="text-ink-500 mb-6 max-w-md mx-auto">
          {h.nlBody}
        </p>
        <NewsletterForm lang={lang} />
      </section>
    </div>
  );
}
