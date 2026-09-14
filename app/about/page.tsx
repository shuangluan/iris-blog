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
          <em>[ Replace this whole file at </em>
          <code>app/about/page.tsx</code>
          <em> with your real bio. The structure below is a five-block starter — each
          answers one thing a first-time visitor would ask. ]</em>
        </p>
        <p>
          I'm a ___ based between Shanghai and the Bay Area. I write here about
          the things I care about that don't fit anywhere else — product
          decisions, small essays, travel notes, and the side projects I keep
          making on weekends.
        </p>
        <p>
          Before this, I ___. These days I'm mostly working on ___.
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
            ["📍", "Location", "___"],
            ["🎧", "Listening to", "___"],
            ["📖", "Reading", "___"],
            ["🛠️", "Building", "___"],
            ["🎬", "Watching", "___"]
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
        <p className="mt-3 text-xs text-ink-300">
          A "now page" (
          <a
            href="https://nownownow.com"
            className="underline decoration-lilac-200 underline-offset-4 hover:text-ink-700"
          >
            nownownow.com
          </a>
          ) — update it once a month.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink-900 mb-5">
          Things I've made
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              name: "Verbatim",
              desc: "Anti-hallucination search over real podcast transcripts. Alpha.",
              url: "https://byverbatim.com"
            },
            { name: "Side Project #2", desc: "One-line pitch", url: "#" },
            { name: "Side Project #3", desc: "One-line pitch", url: "#" },
            { name: "Side Project #4", desc: "One-line pitch", url: "#" }
          ].map((p) => {
            const external = p.url.startsWith("http");
            return (
              <a
                key={p.name}
                href={p.url}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="no-underline block glass rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-softLg transition-all"
              >
                <div className="font-medium text-ink-900 flex items-center gap-1.5">
                  {p.name} <span className="text-ink-300 group-hover:text-ink-500">↗</span>
                </div>
                <div className="text-sm text-ink-500 mt-0.5">{p.desc}</div>
              </a>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink-900 mb-5">
          Elsewhere
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Twitter / X", url: "https://x.com" },
            { label: "GitHub", url: "https://github.com" },
            { label: "LinkedIn", url: "https://linkedin.com" },
            { label: "小红书", url: "https://xiaohongshu.com" },
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
