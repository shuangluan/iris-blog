import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Who Iris is and why this blog exists."
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-14">
      <header>
        <span className="chip mb-5">About</span>
        <h1 className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-ink-900 leading-[1.02]">
          Hi, I'm <span className="gradient-text italic">Iris.</span>
        </h1>
      </header>

      <section className="prose-soft">
        <p>
          <em>[ The world is a playground, and I'm just a kid playing in it.]</em>
        </p>
        <p>
          I'm a Product Manager based between Shanghai and the New York City. I write here about
          the things I care about that don't fit anywhere else — product
          decisions, small notes, case studies,travel tips, and the side projects I keep
          making on weekends.
        </p>
        <p>
          The best way to reach me is{" "}
          <a href="mailto:hi@irisluan.com">hi@irisluan.com</a>. I answer everything
          that isn't a pitch.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink-900 mb-5">
          Currently
        </h2>
        <ul className="glass rounded-2xl divide-y divide-lilac-200/30">
          {[
            ["📍", "Location", "Columbia, South Carolina"],
            ["🎧", "Listening to", "Five little monkeys(my son's favorite)"],
            ["📖", "Reading", "Nothing"],
            ["🛠️", "Building", "Verbatim"],
            ["🎬", "Watching", "Nothing"]
          ].map(([e, k, v]) => (
            <li key={k as string} className="flex items-center gap-3 px-5 py-3">
              <span aria-hidden>{e}</span>
              <span className="text-xs uppercase tracking-widest text-lilac-600 w-24">
                {k}
              </span>
              <span className="text-ink-700 text-sm">{v}</span>
            </li>
          ))}
        </ul>
      
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink-900 mb-5">
          Things I've made
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "Side Project #1", desc: "One-line pitch", url: "#" },
            { name: "Side Project #2", desc: "One-line pitch", url: "#" },
            { name: "Side Project #3", desc: "One-line pitch", url: "#" },
            { name: "Side Project #4", desc: "One-line pitch", url: "#" }
          ].map((p) => (
            <a
              key={p.name}
              href={p.url}
              className="no-underline block glass rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-softLg transition-all"
            >
              <div className="font-medium text-ink-900 flex items-center gap-1.5">
                {p.name} <span className="text-ink-300 group-hover:text-ink-500">↗</span>
              </div>
              <div className="text-sm text-ink-500 mt-0.5">{p.desc}</div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink-900 mb-5">
          Elsewhere
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Twitter / X", url: "https://x.com/Iris_LS_Luan" },
            { label: "GitHub", url: "https://github.com/shuangluan" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/iris-luan/" },
            { label: "小红书", url: "https://www.xiaohongshu.com/user/profile/558bbaffb7ba22527a95ea26" },
            { label: "Email", url: "mailto:hi@irisluan.com" },
            { label: "RSS", url: "/rss.xml" }
          ].map((l) => (
            <a key={l.label} href={l.url} className="chip">
              {l.label} ↗
            </a>
          ))}
        </div>
      </section>

      <section className="glass-strong rounded-3xl px-6 sm:px-10 py-10 text-center">
        <p className="text-ink-700 mb-4">
          Say hi:{" "}
          <a
            href="mailto:hi@irisluan.com"
            className="underline decoration-lilac-200 underline-offset-4 hover:text-ink-900"
          >
            hi@irisluan.com
          </a>
        </p>
        <Link href="/posts" className="btn-primary">Start reading →</Link>
      </section>
    </div>
  );
}
