import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getLang } from "@/lib/lang-server";
import { SITE_URL, pageMeta, jsonLd, personSchema } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Iris Luan is an independent AI product consultant and former ByteDance / TikTok lead PM with 7.5 years building internal platforms and creator tools.",
  path: "/about",
  type: "profile"
});

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/about`,
  mainEntity: {
    ...personSchema,
    description:
      "Independent AI product consultant. 7.5 years as a product manager at ByteDance / TikTok building internal platforms and creator tools.",
    knowsAbout: [
      "AI product management",
      "Product requirements documents",
      "Generative engine optimization",
      "Creator economy",
      "Internal tools and CRM"
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Leeds" },
      { "@type": "CollegeOrUniversity", name: "Communication University of Zhejiang" }
    ]
  }
};

const copy = {
  en: {
    chip: "About",
    hi: "Hi, I'm",
    motto: "The world is a playground, and I'm just a kid playing in it.",
    bio: [
      "I'm an internet product manager working between Shanghai and New York. I spent 7.5 years as a product manager at ByteDance / TikTok, building internal platforms and creator tools. Now I help teams and aspiring AI PMs turn AI ideas into products engineers can actually build, and I write here about the things I care about that don't fit anywhere else: product decisions, small notes, case studies, travel notes, and the side projects I keep making on weekends."
    ],
    founded: {
      before: "In 2026 I co-founded ",
      after: ", and I'm currently building it solo."
    },
    reachA: "The best way to reach me is",
    reachB: "For consulting, see",
    servicesLink: "my services",
    currently: "Currently",
    now: [
      ["📍", "Location", "Columbia, South Carolina"],
      ["🎧", "Listening to", "Five Little Monkeys (my son's favorite)"],
      ["📖", "Reading", "Nothing"],
      ["🛠️", "Building", "ZEAI"],
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
    madeLink: "See projects →",
    period: "."
  },
  zh: {
    chip: "关于",
    hi: "你好，我是",
    motto: "世界是个游乐场，而我只是在里面玩耍的小孩。",
    bio: [
      "我是一名互联网产品经理，工作在上海和纽约之间。我在字节跳动 / TikTok 做了 7.5 年产品经理，做过 TikTok 效率协作平台、内部运营后台和创作者平台。现在我帮助团队和想转型 AI PM 的人，把 AI 想法变成工程师真正能做出来的产品。我也在这里写那些放不进别的地方的东西：产品决策、随笔、案例复盘、旅行笔记，以及我周末一直在做的个人项目。"
    ],
    founded: {
      before: "2026 年我联合创办了 ",
      after: "，目前由我一个人负责推进。"
    },
    reachA: "联系我最好的方式是",
    reachB: "咨询相关的事情，可以先看看",
    servicesLink: "我的服务",
    currently: "最近",
    now: [
      ["📍", "所在地", "南卡罗来纳州 Columbia"],
      ["🎧", "在听", "Five Little Monkeys（我儿子最爱的）"],
      ["📖", "在读", "暂无"],
      ["🛠️", "在做", "ZEAI"],
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
    madeLink: "查看项目 →",
    period: "。"
  }
};

export default function AboutPage() {
  const c = copy[getLang()];

  return (
    <div className="page page-stack">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <div>
        <PageHeader title={`${c.hi} Iris.`} />
        <p className="motto">{c.motto}</p>
        <div className="about-hero">
            <section className="prose">
              {c.bio.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
              <p>
                {c.founded.before}
                <a href="https://zeai.ai" rel="noreferrer">
                  ZEAI
                </a>
                {c.founded.after}
              </p>
              <p>
                {c.reachA}{" "}
                <a href="mailto:luanshuang.ls@gmail.com">hi@irisluan.com</a>. {c.reachB}{" "}
                <Link href="/services">{c.servicesLink}</Link>
                {c.period}
              </p>
            </section>
            <figure className="about-photo">
              <Image
                src="/images/iris-portrait.jpg"
                alt="Portrait of Iris Luan"
                width={683}
                height={853}
                priority
                sizes="(max-width: 767px) 160px, 200px"
                className="about-portrait"
              />
              <figcaption>Iris Luan</figcaption>
            </figure>
          </div>
        </div>

      <section>
        <h2 className="section-title">{c.currently}</h2>
        <dl className="now-list">
          {c.now.map(([e, k, v]) => (
            <div key={k}>
              <dt>
                <span aria-hidden>{e} </span>
                {k}
              </dt>
              <dd>
                {v === "ZEAI" ? (
                  <a href="https://zeai.ai" rel="noreferrer">
                    ZEAI
                  </a>
                ) : (
                  v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="section-title">{c.made}</h2>
        <p>
          <Link href="/projects">{c.madeLink}</Link>
        </p>
      </section>

      <section>
        <h2 className="section-title">{c.elsewhere}</h2>
        <div className="link-row">
          {[
            { label: "X @iris_ls_luan", url: "https://x.com/iris_ls_luan" },
            { label: "小红书 Iris", url: "https://xhslink.cn/o/90fVn574k1y" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/iris-luan" },
            { label: "GitHub", url: "https://github.com/shuangluan" },
            { label: "Email", url: "mailto:luanshuang.ls@gmail.com" }
          ].map((l) => (
            <a key={l.label} href={l.url}>
              {l.label}
            </a>
          ))}
        </div>
      </section>

      <p>
        <Link href="/writing">{c.start}</Link>
      </p>
    </div>
  );
}
