import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllTags,
  getAllPosts,
  CATEGORY_LABELS,
  type Category
} from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse posts by tag or category."
};

const cats: Category[] = ["notes", "case-study", "travel", "life", "side-project"];

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();
  const max = Math.max(...tags.map((t) => t.count), 1);

  return (
    <div className="space-y-14">
      <header>
        <span className="chip mb-5">✦ {tags.length} tags · {posts.length} posts</span>
        <h1 className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-ink-900 leading-[1.02] mb-4">
          Find something to <span className="gradient-text italic">read.</span>
        </h1>
      </header>

      <section>
        <h2 className="font-display text-xl font-medium text-ink-900 mb-4">
          By category
        </h2>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => {
            const count = posts.filter((p) => p.category === c).length;
            return (
              <Link key={c} href={`#${c}`} className="chip">
                {CATEGORY_LABELS[c]}
                <span className="ml-1 text-ink-300">{count}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-medium text-ink-900 mb-4">
          Tag cloud
        </h2>
        {tags.length === 0 ? (
          <p className="text-ink-500">
            No tags yet. Add tags in each post's frontmatter.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 items-baseline">
            {tags.map(({ tag, count }) => {
              const scale = 0.85 + (count / max) * 0.9;
              return (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="chip"
                  style={{
                    fontSize: `${13 * scale}px`,
                    padding: `${4 * scale}px ${12 * scale}px`
                  }}
                >
                  #{tag}
                  <span className="ml-1 text-ink-300">{count}</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {cats.map((c) => {
        const list = posts.filter((p) => p.category === c);
        if (!list.length) return null;
        return (
          <section key={c} id={c} className="scroll-mt-24">
            <h2 className="font-display text-xl font-medium text-ink-900 mb-3">
              {CATEGORY_LABELS[c]}
            </h2>
            <ul className="glass rounded-2xl divide-y divide-lilac-200/30">
              {list.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/posts/${p.slug}`}
                    className="no-underline flex items-baseline justify-between gap-4 px-5 py-3 hover:bg-white/40 transition-colors"
                  >
                    <span className="text-ink-900 truncate">{p.title}</span>
                    <time className="text-xs text-ink-300 flex-shrink-0">
                      {new Date(p.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "2-digit"
                      })}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
