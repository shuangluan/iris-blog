import type { Metadata } from "next";
import PostRow from "@/components/PostRow";
import { filterPosts, getAllPosts, getWritingFilters } from "@/lib/posts";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/lang-server";
import { pageMeta } from "@/lib/site";

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
  const posts = filterPosts(getAllPosts(lang), tag);
  const filters = getWritingFilters(lang);
  const known = new Set(filters.map((f) => f.tag));
  const activeLabel =
    tag && tag in d.categories ? d.categories[tag as keyof typeof d.categories] : tag;

  return (
    <div className="spread" style={{ paddingBottom: "var(--space-7)" }}>
      <header className="page-head">
        <h1 className="page-title">{d.writing.title}</h1>
        <p className="eyebrow" style={{ marginTop: "0.75rem" }}>
          {d.writing.count(posts.length)}
        </p>
        <nav className="filters" aria-label={lang === "zh" ? "标签" : "Tags"}>
          <a href="/writing" aria-current={tag ? undefined : "page"}>
            {d.writing.all}
          </a>
          {filters.map((f) => {
            const label =
              f.kind === "category" && f.tag in d.categories
                ? d.categories[f.tag as keyof typeof d.categories]
                : f.tag;
            const on = tag === f.tag;
            return (
              <a
                key={f.tag}
                href={`/writing?tag=${encodeURIComponent(f.tag)}`}
                aria-current={on ? "page" : undefined}
              >
                {label}
              </a>
            );
          })}
          {tag && !known.has(tag) ? (
            <a href={`/writing?tag=${encodeURIComponent(tag)}`} aria-current="page">
              {activeLabel}
            </a>
          ) : null}
        </nav>
      </header>

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
