import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { CATEGORY_LABELS } from "@/lib/posts";

const paletteByCat: Record<string, { from: string; to: string; text: string }> = {
  notes: { from: "#fce4ec", to: "#efe9ff", text: "#7a5cb8" },
  "case-study": { from: "#fef3e8", to: "#fce4ec", text: "#d1487a" },
  travel: { from: "#e9f4ff", to: "#efe9ff", text: "#4a6fb8" },
  life: { from: "#fef3e8", to: "#fbeaea", text: "#c66434" },
  "side-project": { from: "#efe9ff", to: "#e9f4ff", text: "#6b3fb1" }
};

export default function PostCard({
  post,
  featured = false
}: {
  post: PostMeta;
  featured?: boolean;
}) {
  const p = paletteByCat[post.category] ?? paletteByCat.notes;
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group no-underline block glass rounded-3xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-softLg"
    >
      <div
        className="h-24 relative"
        style={{
          background: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`
        }}
      >
        <span
          className="absolute top-3 left-4 text-[11px] font-medium tracking-wide uppercase"
          style={{ color: p.text }}
        >
          ◐ {CATEGORY_LABELS[post.category]}
        </span>
        {featured ? (
          <span className="absolute top-3 right-4 text-[10px] font-medium tracking-widest uppercase bg-white/80 backdrop-blur px-2 py-0.5 rounded-full text-ink-700">
            Latest
          </span>
        ) : null}
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-ink-900 leading-tight mb-2 group-hover:gradient-text">
          {post.title}
        </h3>
        <p className="text-sm text-ink-500 leading-relaxed line-clamp-3 mb-4">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-xs text-ink-300">
          <time>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric"
            })}
          </time>
          <span>{post.readingTime}</span>
        </div>
        {post.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((t) => (
              <span key={t} className="chip">
                #{t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
