import type { Metadata } from "next";
import Link from "next/link";
import { getLang } from "@/lib/lang-server";

export const metadata: Metadata = {
  title: "About",
  description: "Who Iris is and why this blog exists."
};

const copy = {
  en: {
    chip: "About",
    hi: "Hi, I'm",
    motto: "The world is a playground, and I'm just a kid playing in it.",
    bio: [
      "I'm an independent consultant and creator working between Shanghai and New York. I spent 7.5 years as a product manager at ByteDance / TikTok, building internal platforms and creator tools. Now I help teams and aspiring AI PMs turn AI ideas into products engineers can actually build, and I write here about the things I care about that don't fit anywhere else: product decisions, small notes, case studies, travel notes, and the side projects I keep making on weekends.",
      "In 2026 I co-founded a company to explore AI products; currently running solo while I focus on consulting and writing."
    ],
    reachA: "The best way to reach me is",
    reachB: "For consulting, see",
    servicesLink: "my services",
    currently: "Currently",
    now: [
      ["📍", "Location", "Columbia, South Carolina"],
      ["🎧", "Listening to", "Five Little Monkeys (my son's favorite)"],
      ["📖", "Reading", "Nothing"],
      ["🛠️", "Building", "Verbatim"],
      ["🎬", "Watching", "Nothing"]
    ],
    made: "Things I've made",
    projects: {
      onelink:
        "TikTok's internal operations platform for employee efficiency, supporting multi-role collaboration across global teams. (Details desensitized.)",
      verbatim:
        "A search engine over real human experience, indexing podcast conversations. In alpha.",
      site: "This site: my personal brand home and bilingual writing desk."
    },
    elsewhere: "Elsewhere",
    start: "Start reading →",
    period: "."
  },
  zh: {
    chip: "关于",
    hi: "你好，我是",
    motto: "世界是个游乐场，而我只是在里面玩耍的小孩。",
    bio: [
      "我是一名独立顾问和创作者，在上海和纽约之间生活和工作。我在字节跳动 / TikTok 做了 7.5 年产品经理，做过 TikTok 效率协作平台、内部运营后台和创作者平台。现在我帮助团队和想转型 AI PM 的人，把 AI 想法变成工程师真正能做出来的产品。我也在这里写那些放不进别的地方的东西：产品决策、随笔、案例复盘、旅行笔记，以及我周末一直在做的个人项目。",
      "2026 年我联合创办了一家公司探索 AI 产品；目前一个人在做，专注于咨询和写作。"
    ],
    reachA: "联系我最好的方式是",
    reachB: "咨询相关的事情，可以先看看",
    servicesLink: "我的服务",
    currently: "最近",
    now: [
      ["📍", "所在地", "南卡罗来纳州 Columbia"],
      ["🎧", "在听", "Five Little Monkeys（我儿子最爱的）"],
      ["📖", "在读", "暂无"],
      ["🛠️", "在做", "Verbatim"],
      ["🎬", "在看", "暂无"]
    ],
    made: "我做过的东西",
    projects: {
      onelink:
        "TikTok 内部员工效率运营平台，支持全球团队多角色协作。（细节已脱敏）",
      verbatim: "一个基于真人经验的搜索引擎，索引播客对话内容。Alpha 阶段。",
      site: "就是这个网站：我的个人品牌主页和双语写作空间。"
    },
    elsewhere: "其他地方",
    start: "开始阅读 →",
    period: "。"
  }
};

export default function AboutPage() {
  const c = copy[getLang()];

  const projects: { name: string; desc: string; url?: string }[] = [
    { name: "OneLink", desc: c.projects.onelink },
    { name: "Verbatim", desc: c.projects.verbatim, url: "https://byverbatim.com" },
    { name: "irisluan.com", desc: c.projects.site, url: "/" }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-14">
      <header>
        <span className="chip mb-5">{c.chip}</span>
        <h1 className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-ink-900 leading-[1.02]">
          {c.hi} <span className="gradient-text italic">Iris.</span>
        </h1>
        <p className="mt-5 text-lg italic text-ink-500">{c.motto}</p>
      </header>

      <section className="prose-soft">
        {c.bio.map((para) => (
          <p key={para.slice(0, 20)}>{para}</p>
        ))}
        <p>
          {c.reachA}{" "}
          <a href="mailto:luanshuang.ls@gmail.com">hi@irisluan.com</a>. {c.reachB}{" "}
          <Link href="/services">{c.servicesLink}</Link>{c.period}
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink-900 mb-5">
          {c.currently}
        </h2>
        <ul className="glass rounded-2xl divide-y divide-lilac-200/30">
          {c.now.map(([e, k, v]) => (
            <li key={k} className="flex items-center gap-3 px-5 py-3">
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
          {c.made}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p) => {
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
          {c.elsewhere}
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
        <Link href="/posts" className="btn-primary">{c.start}</Link>
      </section>
    </div>
  );
}
