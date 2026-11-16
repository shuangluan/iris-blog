import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PostRow from "@/components/PostRow";
import { filterPosts, getAllPosts, type Category } from "@/lib/posts";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/lang-server";
import { pageMeta } from "@/lib/site";

const FILTERS: Category[] = ["notes", "case-study", "travel", "side-project"];

function one(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const tag = raw?.trim();
  return tag ? tag : undefined;
}

export function generateMetadata({
  searchParams
}: {
  searchParams: { tag?: string | string[] };
}): Metadata {
  const lang = getLang();
  const d = t(lang);
  const tag = one(searchParams.tag);
  const posts = filterPosts(getAllPosts(lang), tag);
  const label = tag && tag in d.categories ? d.categories[tag as keyof typeof d.categories] : tag;
  return pageMeta({
    title: label ? `${label}` : d.writing.title,
    description:
      "Every post by Iris Luan: AI product case studies, GEO and SEO experiments, notes, travel journals, and side projects, in English and Chinese.",
    path: tag ? `/writing?tag=${encodeURIComponent(tag)}` : "/writing",
    noindex: Boolean(tag) && posts.length < 2
  });
}

export default function WritingPage({
  searchParams
}: {
  searchParams: { tag?: string | string[] };
}) {
  const lang = getLang();
  const d = t(lang);
  const tag = one(searchParams.tag);
  const all = getAllPosts(lang);
  const matched = tag ? filterPosts(all, tag) : all;
  const posts = tag && matched.length === 0 ? all : matched;
  const activeFilter = tag && matched.length > 0 && (FILTERS as string[]).includes(tag) ? tag : undefined;

  return (
    <div className="page" style={{ paddingBottom: "var(--space-7)" }}>
      <PageHeader title={d.writing.title}>
        <p className="eyebrow" style={{ marginTop: "0.75rem" }}>
          {d.writing.count(posts.length)}
        </p>
        <nav className="filters" aria-label={lang === "zh" ? "标签" : "Tags"}>
          <a href="/writing" aria-current={activeFilter ? undefined : "page"}>
            {d.writing.all}
          </a>
          {FILTERS.map((key) => (
            <a
              key={key}
              href={`/writing?tag=${key}`}
              aria-current={activeFilter === key ? "page" : undefined}
            >
              {d.categories[key]}
            </a>
          ))}
        </nav>
      </PageHeader>

      {posts.length === 0 ? (
        <p className="empty">{d.writing.empty}</p>
      ) : (
        <ul className="post-list">
          {posts.map((p) => (
            <PostRow key={p.slug} post={p} lang={lang} />
          ))}
        </ul>
      )}
    </div>
  );
}
