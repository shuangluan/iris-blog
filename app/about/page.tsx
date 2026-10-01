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
        <p className="mt-5 text-lg italic text-ink-500">
          The world is a playground, and I'm just a kid playing in it.
        </p>
      </header>

      <section className="prose-soft">
        <p>
          I'm an independent consultant and creator working between Shanghai and
          New York. I spent 7.5 years as a product manager at ByteDance / TikTok,
          building internal platforms and creator tools. Now I help teams and
          aspiring AI PMs turn AI ideas into products engineers can actually
          build, and I write here about the things I care about that don't fit
          anywhere else: product decisions, small notes, case studies, travel
          notes, and the side projects I keep making on weekends.
        </p>
        <p>
          In 2026 I co-founded a company to explore AI products; currently
          running solo while I focus on consulting and writing.
        </p>
        <p>
          The best way to reach me is{" "}
          <a href="mailto:luanshuang.ls@gmail.com">hi@irisluan.com</a>. For consulting
          inquiries, email me directly for now, a services page is on the way.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink-900 mb-5">
          Currently
        </h2>
        <ul className="glass rounded-2xl divide-y divide-lilac-200/30">
          {[
            ["📍", "Location", "Columbia, South Carolina"],
            ["🎧", "Listening to", "Five Little Monkeys (my son's favorite)"],
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
            {
              name: "OneLink",
              desc: "TikTok's internal operations platform for employee efficiency, supporting multi-role collaboration across global teams. (Details desensitized.)"
            },
            {
              name: "Verbatim",
              desc: "A search engine over real human experience, indexing podcast conversations. In alpha.",
              url: "https://byverbatim.com"
            },
            {
              name: "irisluan.com",
              desc: "This site: my personal brand home and bilingual writing desk.",
              url: "/"
            }
          ].map((p) => {
            const content = (
              <>
                <div className="font-medium text-ink-900 flex items-center gap-1.5">
                  {p.name}
                  {p.url && <span className="text-ink-300 group-hover:text-ink-500">↗</span>}
                </div>
                <div className="text-sm text-ink-500 mt-0.5">{p.desc}</div>
              </>
            );
            if (!p.url) {
              return (
                <div key={p.name} className="glass rounded-2xl p-5">
                  {content}
                </div>
              );
            }
            const external = p.url.startsWith("http");
            return (
              <a
                key={p.name}
                href={p.url}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="no-underline block glass rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-softLg transition-all"
              >
                {content}
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
            { label: "X @iris_ls_luan", url: "https://x.com/iris_ls_luan" },
            { label: "小红书 Iris", url: "https://xhslink.cn/o/90fVn574k1y" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/iris-luan" },
            { label: "GitHub", url: "https://github.com/shuangluan" },
            { label: "Email", url: "mailto:luanshuang.ls@gmail.com" }
          ].map((l) => (
            <a key={l.label} href={l.url} className="chip">
              {l.label} ↗
            </a>
          ))}
        </div>
      </section>

      <section className="glass-strong rounded-3xl px-6 sm:px-10 py-10 text-center">
        <Link href="/posts" className="btn-primary">Start reading →</Link>
      </section>
    </div>
  );
}
