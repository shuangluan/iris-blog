import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/lang-server";

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  const count = getPostsByTag(tag, "en").length; // translated pairs count once
  return pageMeta({
    title: `#${tag}`,
    description: `Posts by Iris Luan tagged #${tag}.`,
    path: `/tags/${encodeURIComponent(tag)}`,
    // Single-post tag pages are near-duplicates of the post itself
    noindex: count < 2
  });
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const lang = getLang();
  const d = t(lang);
  const posts = getPostsByTag(tag, lang);
  return (
    <div className="space-y-10">
      <header>
        <Link
          href="/tags"
          className="text-sm text-ink-500 hover:text-ink-900 underline decoration-lilac-200 underline-offset-4 mb-5 inline-block"
        >
          {d.tags.back}
        </Link>
        <span className="chip mb-4 block w-fit">
          {d.tags.nPosts(posts.length)}
        </span>
        <h1 className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-ink-900 leading-[1.02] break-words">
          <span className="text-ink-300">#</span>
          <span className="gradient-text italic">{tag}</span>
        </h1>
      </header>

      {posts.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-ink-700">
          {d.tags.none}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
