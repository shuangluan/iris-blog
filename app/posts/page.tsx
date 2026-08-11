import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import {
  getAllPosts,
  CATEGORY_LABELS,
  CATEGORY_BLURBS,
  type Category
} from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Every note, case study, travel journal, and side project."
};

const cats: Category[] = ["notes", "case-study", "travel", "life", "side-project"];

export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <div className="space-y-14">
      <header>
        <span className="chip mb-5">✦ {posts.length} posts</span>
        <h1 className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-ink-900 leading-[1.02] mb-4">
          Everything I've <span className="gradient-text italic">written.</span>
        </h1>
        <p className="text-lg text-ink-500 max-w-xl">
          Sorted newest-first, grouped by kind. Or browse by{" "}
          <a href="/tags" className="underline decoration-lilac-200 underline-offset-4 hover:text-ink-900">
            tag
          </a>.
        </p>
      </header>

      {cats.map((c) => {
        const list = posts.filter((p) => p.category === c);
        if (!list.length) return null;
        return (
          <section key={c} id={c} className="scroll-mt-24">
            <div className="mb-5">
              <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900">
                {CATEGORY_LABELS[c]}
                <span className="ml-3 text-sm font-sans font-normal text-ink-300 align-middle">
                  {list.length}
                </span>
              </h2>
              <p className="text-sm text-ink-500 mt-1">{CATEGORY_BLURBS[c]}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {list.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
