import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { DICTS, type Lang } from "./i18n";

export type Category =
  | "notes"
  | "case-study"
  | "travel"
  | "life"
  | "side-project";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  category: Category;
  tags: string[];
  cover?: string;
  readingTime: string;
  readingMinutes: number;
  draft?: boolean;
  /** Language the post is written in. Frontmatter `lang: en | zh`, else guessed from the title. */
  lang: Lang;
  /** Posts sharing a translationKey are translations of each other. */
  translationKey: string;
}

export interface Post extends PostMeta {
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// In production we hide drafts. In local dev we show them so you can preview.
const IS_PROD = process.env.NODE_ENV === "production";
function isVisible(p: { draft?: boolean }) {
  return IS_PROD ? !p.draft : true;
}

const CJK = /[㐀-鿿]/;

function readAll(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
  return files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);
    const title = String(data.title ?? slug);
    const lang: Lang =
      data.lang === "zh" || data.lang === "en"
        ? data.lang
        : CJK.test(title)
        ? "zh"
        : "en";
    return {
      slug,
      title,
      description: String(data.description ?? ""),
      date: new Date(data.date ?? Date.now()).toISOString(),
      category: (data.category ?? "notes") as Category,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      cover: data.cover ? String(data.cover) : undefined,
      readingTime: rt.text,
      readingMinutes: rt.minutes,
      draft: Boolean(data.draft),
      lang,
      translationKey: data.translationKey ? String(data.translationKey) : slug,
      content
    };
  });
}

function visibleSorted(): Post[] {
  return readAll()
    .filter(isVisible)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function strip({ content, ...meta }: Post): PostMeta {
  return meta;
}

/**
 * All visible posts. When `lang` is given, translated pairs collapse into one
 * entry: the version in `lang` if it exists, otherwise the other one.
 */
export function getAllPosts(lang?: Lang): PostMeta[] {
  return collapse(visibleSorted(), lang);
}

/** Collapses translated pairs to one entry per translationKey, preferring `lang`. */
function collapse(posts: Post[], lang?: Lang): PostMeta[] {
  if (!lang) return posts.map(strip);
  const groups = new Map<string, Post[]>();
  for (const p of posts) {
    const g = groups.get(p.translationKey) ?? [];
    g.push(p);
    groups.set(p.translationKey, g);
  }
  const picked: Post[] = [];
  for (const g of groups.values()) {
    picked.push(g.find((p) => p.lang === lang) ?? g[0]);
  }
  return picked
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(strip);
}

export function getPost(slug: string): Post | null {
  const post = readAll().find((p) => p.slug === slug) ?? null;
  if (!post) return null;
  if (!isVisible(post)) return null;
  return post;
}

/** The visible post in the other language with the same translationKey, if any. */
export function getTranslation(post: PostMeta): PostMeta | null {
  const other = visibleSorted().find(
    (p) =>
      p.translationKey === post.translationKey &&
      p.slug !== post.slug &&
      p.lang !== post.lang
  );
  return other ? strip(other) : null;
}

export function getAllSlugs(): string[] {
  return readAll().filter(isVisible).map((p) => p.slug);
}

export function getAllTags(lang?: Lang): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of getAllPosts(lang)) {
    for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// Tags differ per language (写作 vs writing), so filter before collapsing:
// otherwise a Chinese tag shows an empty page in the English UI.
export function getPostsByTag(tag: string, lang?: Lang): PostMeta[] {
  return collapse(
    visibleSorted().filter((p) => p.tags.includes(tag)),
    lang
  );
}

export function getPostsByCategory(cat: Category, lang?: Lang): PostMeta[] {
  return getAllPosts(lang).filter((p) => p.category === cat);
}

// Kept for anything that still imports them (e.g. RSS). UI uses lib/i18n.
export const CATEGORY_LABELS: Record<Category, string> = DICTS.en.categories;
export const CATEGORY_BLURBS: Record<Category, string> = DICTS.en.blurbs;
