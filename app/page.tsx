import Link from "next/link";
import PostCard from "@/components/PostCard";
import {
  CATEGORY_LABELS,
  CATEGORY_BLURBS,
  getAllPosts,
  type Category
} from "@/lib/posts";

const cats: { key: Category; icon: string; from: string; to: string; text: string }[] = [
  { key: "notes", icon: "◐", from: "#fce4ec", to: "#efe9ff", text: "#7a5cb8" },
  { key: "case-study", icon: "◑", from: "#fef3e8", to: "#fce4ec", text: "#d1487a" },
  { key: "travel", icon: "◒", from: "#e9f4ff", to: "#efe9ff", text: "#4a6fb8" },
  { key: "life", icon: "◓", from: "#fef3e8", to: "#fbeaea", text: "#c66434" },
  { key: "side-project", icon: "✦", from: "#efe9ff", to: "#e9f4ff", text: "#6b3fb1" }
];

export default function HomePage() {
  const posts = getAllPosts();
  const [hero, ...rest] = posts;

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* HERO */}
      <section className="pt-4 sm:pt-8">
        <span className="chip mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blush-400 to-lilac-400" />
          Writing since 2026 · Shanghai ⇄ NY
        </span>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-ink-900 leading-[1.02] mb-6">
          Small notes from<br className="hidden sm:inline" />
          <span className="gradient-text italic">a life between two coasts.</span>
        </h1>
        <p className="text-lg sm:text-xl text-ink-500 max-w-2xl leading-relaxed mb-8">
          I'm Iris. This is where I keep my longer thoughts — reflections,
          case studies of things I've shipped, travel journals, and the side
          products I keep making on weekends.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/posts" className="btn-primary">Start reading →</Link>
          <Link href="/about" className="btn-ghost">About me</Link>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900">
            What you'll find here
          </h2>
          <Link href="/tags" className="text-sm text-lilac-600 hover:text-ink-900">All tags →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cats.map((c) => {
            const count = posts.filter((p) => p.category === c.key).length;
            return (
              <Link
                key={c.key}
                href={`/posts#${c.key}`}
                className="no-underline group block rounded-3xl overflow-hidden glass hover:-translate-y-0.5 hover:shadow-softLg transition-all"
              >
                <div
                  className="h-16"
                  style={{
                    background: `linear-gradient(135deg, ${c.from} 0%, ${c.to} 100%)`
                  }}
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-sm font-medium tracking-wide"
                      style={{ color: c.text }}
                    >
                      {c.icon} {CATEGORY_LABELS[c.key]}
                    </span>
                    <span className="text-xs text-ink-300">{count}</span>
                  </div>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {CATEGORY_BLURBS[c.key]}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HERO POST */}
      {hero ? (
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900 mb-6">
            Latest
          </h2>
          <PostCard post={hero} featured />
        </section>
      ) : null}

      {/* RECENT */}
      {rest.length ? (
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900 mb-6">
            More writing
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/posts" className="btn-ghost">See all posts →</Link>
          </div>
        </section>
      ) : null}

      {/* NEWSLETTER */}
      <section className="glass-strong rounded-3xl px-6 sm:px-10 py-10 sm:py-12 text-center">
        <span className="chip mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-peach-400 to-blush-400" />
          Newsletter
        </span>
        <h3 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink-900 mb-3">
          New posts, straight to <span className="gradient-text italic">your inbox.</span>
        </h3>
        <p className="text-ink-500 mb-6 max-w-md mx-auto">
          One email when I publish. No threads, no "10 things", no spam.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="you@somewhere.com"
            className="flex-1 px-4 py-3 rounded-full bg-white/80 border border-white/90 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-lilac-400/40"
          />
          <button type="submit" className="btn-primary justify-center">Subscribe</button>
        </form>
        <div className="mt-4 text-xs text-ink-300">
          Wire to Buttondown / ConvertKit / Beehiiv in <code>app/page.tsx</code>.
        </div>
      </section>
    </div>
  );
}
