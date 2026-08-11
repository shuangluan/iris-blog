import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params
}: {
  params: { tag: string };
}): Promise<Metadata> {
  return {
    title: `#${params.tag}`,
    description: `Posts tagged #${params.tag}`
  };
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag);
  return (
    <div className="space-y-10">
      <header>
        <Link
          href="/tags"
          className="text-sm text-ink-500 hover:text-ink-900 underline decoration-lilac-200 underline-offset-4 mb-5 inline-block"
        >
          ← All tags
        </Link>
        <span className="chip mb-4 block w-fit">
          ✦ {posts.length} {posts.length === 1 ? "post" : "posts"}
        </span>
        <h1 className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-ink-900 leading-[1.02] break-words">
          <span className="text-ink-300">#</span>
          <span className="gradient-text italic">{params.tag}</span>
        </h1>
      </header>

      {posts.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-ink-700">
          No posts with this tag yet. Add{" "}
          <code className="text-lilac-600">tags: [&quot;{params.tag}&quot;]</code>{" "}
          to a post's frontmatter.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
