import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getAllPosts,
  getPost,
  CATEGORY_LABELS
} from "@/lib/posts";
import { Mdx } from "@/lib/mdx";
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
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags
    }
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = all[idx + 1];
  const next = all[idx - 1];

  return (
    <article className="max-w-2xl mx-auto">
      <div className="mb-8 text-sm">
        <Link
          href="/posts"
          className="text-ink-500 hover:text-ink-900 underline decoration-lilac-200 underline-offset-4"
        >
          ← All writing
        </Link>
      </div>

      <header className="mb-10">
        <Link href={`/posts#${post.category}`} className="chip mb-5">
          {CATEGORY_LABELS[post.category]}
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink-900 leading-[1.05]">
          {post.title}
        </h1>
        <p className="mt-5 text-lg text-ink-500 leading-relaxed">
          {post.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-300">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-blush-400 to-lilac-400" />
            <span className="text-ink-500">Iris Luan</span>
          </span>
          <span>·</span>
          <time>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div className="prose-soft">
        <Mdx source={post.content} />
      </div>

      {post.tags?.length ? (
        <div className="mt-12 pt-6 border-t border-lilac-200/40 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link key={t} href={`/tags/${t}`} className="chip">
              #{t}
            </Link>
          ))}
        </div>
      ) : null}

      <ShareButtons
        url={`${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://irisluan.com"}/posts/${post.slug}`}
        title={post.title}
        description={post.description}
      />

      <TipJar />

      {/* prev/next */}
      <div className="grid gap-3 sm:grid-cols-2 mt-12">
        {prev ? (
          <Link
            href={`/posts/${prev.slug}`}
            className="no-underline glass rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-softLg transition-all block"
          >
            <div className="text-xs uppercase tracking-widest text-lilac-600 mb-1">
              ← Previous
            </div>
            <div className="font-medium text-ink-900 text-sm">{prev.title}</div>
          </Link>
        ) : <div />}
        {next ? (
          <Link
            href={`/posts/${next.slug}`}
            className="no-underline glass rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-softLg transition-all block sm:text-right"
          >
            <div className="text-xs uppercase tracking-widest text-blush-600 mb-1">
              Next →
            </div>
            <div className="font-medium text-ink-900 text-sm">{next.title}</div>
          </Link>
        ) : <div />}
      </div>

      {/* Comments */}
      <section className="mt-16">
        <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900 mb-5">
          Say something
        </h2>
        <Comments />
      </section>
    </article>
  );
}
