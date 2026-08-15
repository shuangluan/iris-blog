import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

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
  draft?: boolean;
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

function readAll(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
  return files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: new Date(data.date ?? Date.now()).toISOString(),
      category: (data.category ?? "notes") as Category,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      cover: data.cover ? String(data.cover) : undefined,
      readingTime: rt.text,
      draft: Boolean(data.draft),
      content
    };
  });
}

export function getAllPosts(): PostMeta[] {
  return readAll()
    .filter(isVisible)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const post = readAll().find((p) => p.slug === slug) ?? null;
  if (!post) return null;
  if (!isVisible(post)) return null;
  return post;
}

export function getAllSlugs(): string[] {
  return readAll().filter(isVisible).map((p) => p.slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of readAll().filter(isVisible)) {
    for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getPostsByCategory(cat: Category): PostMeta[] {
  return getAllPosts().filter((p) => p.category === cat);
}

export const CATEGORY_LABELS: Record<Category, string> = {
  notes: "Notes",
  "case-study": "Case Studies",
  travel: "Travel",
  life: "US ⇄ CN Life",
  "side-project": "Side Projects"
};

export const CATEGORY_BLURBS: Record<Category, string> = {
  notes: "POV, reflections, small essays. The public account corner.",
  "case-study": "Walk-throughs of things I've shipped or dissected.",
  travel: "Half itinerary, half feelings. From wherever I last landed.",
  life: "Weekly whiplash of living between two countries.",
  "side-project": "Small products that started as one bad Sunday idea."
};
