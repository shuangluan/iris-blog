import type { Metadata } from "next";
import { getLang } from "@/lib/lang-server";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI product consulting: AI PM portfolio PRD rewrite ($200), idea to buildable AI PRD ($699), monthly light advisory ($1,800/mo), and 1:1 calls on career planning, visa experience and moving into AI / PM ($50 / 30 min)."
};

// Free 15-min intro call for the three tiers.
const BOOK_LINK = "https://cal.com/shuang-luan-iris/15min";
// Paid 30-min open-topic call.
const OPEN_CALL_LINK = "https://cal.com/shuang-luan-iris/30min";
const EMAIL_HREF = "mailto:luanshuang.ls@gmail.com";
const EMAIL_LABEL = "hi@irisluan.com";

// Stripe Payment Links. An empty link hides that tier's "Pay now" button.
const STRIPE_LINKS = {
  tier1: "https://buy.stripe.com/eVq3cuc9Y6bCf4BfiH18c00", // $200
  tier2: "https://buy.stripe.com/bJe5kCb5U1Vmg8F8Uj18c01", // $699
  tier3: "https://buy.stripe.com/3cI9ASc9Y9nO4pXfiH18c02" // $1,800 / month
};

type TierId = keyof typeof STRIPE_LINKS;

type Tier = {
  id: TierId;
  price: string;
  unit: string;
  tag?: string;
  name: string;
  timeline: string;
  buyer: string;
  deliverables: string[];
  // Higher-commitment tiers lead with a call; tier 1 leads with checkout.
  callFirst: boolean;
};

type Copy = {
  chip: string;
  h1a: string;
  h1b: string;
  intro: string;
  forWho: string;
  payNow: string;
  bookCall: string;
  stepsTitle: string;
  steps: { title: string; body: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  tiers: Tier[];
  openCall: {
    tag: string;
    name: string;
    price: string;
    unit: string;
    body: string;
    topics: string[];
    note: string;
    cta: string;
  };
};

const copy: Record<"en" | "zh", Copy> = {
  en: {
    chip: "Services",
    h1a: "Turn AI ideas into",
    h1b: "things engineers can build.",
    intro:
      "I spent 7.5 years as a PM at ByteDance / TikTok. Now I help teams and aspiring AI PMs write the docs that get AI products built, and get hired.",
    forWho: "For",
    payNow: "Pay now",
    bookCall: "Free 15-min call",
    stepsTitle: "How it works",
    steps: [
      { title: "Pick a tier", body: "Not sure which fits? Book a free 15-min intro call or email me." },
      { title: "Pay & send materials", body: "Pay securely via Stripe, then email me your PRD or idea and book your call on Cal.com." },
      { title: "Get your deliverables", body: "Written report in 48h (Tier 1) or full PRD in 7 days (Tier 2). Advisory starts the week you join." }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "When are the calls?", a: "Evenings, US Eastern time. Pick a slot on Cal.com." },
      { q: "When does the 48h / 7-day clock start?", a: "From the moment I have both your payment and your materials." },
      { q: "Is my material confidential?", a: "Strictly confidential, never shared. NDA available on request." },
      { q: "What if I'm not satisfied?", a: "Tier 1 includes a re-review and Tier 2 includes two revision rounds. The goal is something you can actually use." },
      { q: "Can I pay in RMB / WeChat Pay?", a: "Stripe (credit card) for now. Email me if you need another option." }
    ],
    ctaTitle: "Not sure which tier fits?",
    ctaBody: "Email me. I reply to everything.",
    tiers: [
      {
        id: "tier1",
        price: "$200",
        unit: "/ review",
        tag: "Start here",
        name: "AI PM Portfolio PRD Deep Rewrite",
        timeline: "Delivered within 48 hours",
        buyer:
          "PMs moving into AI PM roles who have a portfolio PRD and want senior-level polish before interviews.",
        deliverables: [
          "Written review: structural issues, AI sense (do you show you understand what LLMs can and can't do), the questions interviewers will ask, line-by-line revision notes",
          "30-min call: walk through the revisions + mock interview follow-ups",
          "One re-review after you revise"
        ],
        callFirst: false
      },
      {
        id: "tier2",
        price: "$699",
        unit: "/ project",
        name: "From Idea to Buildable AI PRD",
        timeline: "Delivered within 7 days",
        buyer: "Founders and small teams with an idea but no spec, and no time to write one.",
        deliverables: [
          "A complete, build-ready PRD: user stories, edge cases, AI risk checklist, acceptance criteria",
          "30-min kickoff call to align on direction before I write",
          "2 rounds of async revisions"
        ],
        callFirst: true
      },
      {
        id: "tier3",
        price: "$1,800",
        unit: "/ month · 3 seats",
        name: "Monthly Light Advisory",
        timeline: "Monthly, start anytime",
        buyer: "Teams building AI products who want an outside PM brain on call.",
        deliverables: [
          "One async deep review per week (a doc or a direction, your pick)",
          "Ask anytime via WeChat / Lark / email, written reply within 24h",
          "One 30-min recap call per month"
        ],
        callFirst: true
      }
    ],
    openCall: {
      tag: "Open topic",
      name: "1:1 Call",
      price: "$50",
      unit: "/ 30 min",
      body: "Not a PRD thing? Book 30 minutes and bring whatever's on your mind. You pay when you book.",
      topics: ["Career planning", "Visa experience sharing", "Moving into AI / PM"],
      note: "Visa talk is based on my own experience, not legal advice.",
      cta: "Book & pay"
    }
  },
  zh: {
    chip: "咨询服务",
    h1a: "把 AI 想法，变成",
    h1b: "工程师能直接开干的东西。",
    intro:
      "我在字节跳动 / TikTok 做了 7.5 年产品经理。现在帮团队和想转型的 PM，写出能让 AI 产品真正落地、也能帮你拿到 offer 的文档。",
    forWho: "适合谁",
    payNow: "立即购买",
    bookCall: "先约 15 分钟免费通话",
    stepsTitle: "三步开始",
    steps: [
      { title: "选一档服务", body: "不确定选哪档？先约一个 15 分钟免费通话，或者直接发邮件问我。" },
      { title: "付款 & 发材料", body: "通过 Stripe 付款，然后把 PRD 或想法发到我邮箱，并在 Cal.com 上约好通话时间。" },
      { title: "拿交付物", body: "Tier 1 48 小时内出书面报告，Tier 2 7 天内交付完整 PRD。月度顾问从你加入的那周开始。" }
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "通话什么时候进行？", a: "美东时间晚上，在 Cal.com 上自选时间。" },
      { q: "48 小时 / 7 天从什么时候开始算？", a: "从我同时收到付款和你的材料开始算。" },
      { q: "我的材料保密吗？", a: "严格保密，不会外传；需要可以签 NDA。" },
      { q: "不满意怎么办？", a: "Tier 1 含一次复检，Tier 2 含 2 轮修订，目标是一次做到你能用。" },
      { q: "可以用人民币 / 微信支付吗？", a: "目前走 Stripe（信用卡）；需要其他方式请发邮件联系。" }
    ],
    ctaTitle: "不确定哪档适合你？",
    ctaBody: "发邮件给我，每封都回。",
    tiers: [
      {
        id: "tier1",
        price: "$200",
        unit: "/ 次",
        tag: "从这里开始",
        name: "AI PM 求职作品集 PRD 深改",
        timeline: "48 小时内交付",
        buyer: "想转 AI PM、手里有作品集 PRD、缺资深视角打磨的 PM，目标是面试能讲清楚。",
        deliverables: [
          "书面评审报告：结构硬伤、AI sense（是否体现对 LLM 能力与局限的理解）、面试官视角必问清单、逐条修改建议",
          "30 分钟语音通话：讲修改思路 + 模拟面试追问",
          "一次复检：你改完我再看一遍"
        ],
        callFirst: false
      },
      {
        id: "tier2",
        price: "$699",
        unit: "/ 项目",
        name: "从想法到可开发的 AI PRD",
        timeline: "7 天内交付",
        buyer: "有想法、没文档、没时间写的 founder / 小团队。",
        deliverables: [
          "一份工程师能直接开干的完整 PRD：用户故事、边界 case、AI 风险清单、验收标准",
          "30 分钟 kickoff 通话：对齐方向再动笔",
          "2 轮异步修订"
        ],
        callFirst: true
      },
      {
        id: "tier3",
        price: "$1,800",
        unit: "/ 月 · 限 3 席",
        name: "月度轻顾问",
        timeline: "按月合作，随时开始",
        buyer: "持续做 AI 产品、需要一个外部 PM 脑子的团队。",
        deliverables: [
          "每周一次异步深度评审（文档或方向任选）",
          "微信 / 飞书 Lark / 邮件随时问，24 小时内文字回复",
          "每月一次 30 分钟通话复盘"
        ],
        callFirst: true
      }
    ],
    openCall: {
      tag: "话题不限",
      name: "1:1 咨询通话",
      price: "$50",
      unit: "/ 30 分钟",
      body: "不是 PRD 的事也可以聊。约 30 分钟，带着你的问题来，预约时付款。",
      topics: ["职业规划", "签证经验分享", "转型 AI / PM"],
      note: "签证相关内容基于我的个人经历，不构成法律建议。",
      cta: "预约并付款"
    }
  }
};

export default function ServicesPage() {
  const c = copy[getLang()];

  return (
    <div className="space-y-16 sm:space-y-20">
      <header>
        <span className="chip mb-5">{c.chip}</span>
        <h1 className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-ink-900 leading-[1.02] mb-5">
          {c.h1a}
          <br className="hidden sm:inline" />{" "}
          <span className="gradient-text italic">{c.h1b}</span>
        </h1>
        <p className="text-lg text-ink-500 max-w-2xl leading-relaxed">{c.intro}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {c.tiers.map((tier) => {
          const pay = STRIPE_LINKS[tier.id];
          const primaryIsPay = Boolean(pay) && !tier.callFirst;
          return (
            <article key={tier.id} className="flex flex-col glass rounded-3xl p-6 sm:p-7">
              <div className="h-6">
                {tier.tag ? <span className="chip">{tier.tag}</span> : null}
              </div>
              <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-ink-900 leading-tight">
                {tier.name}
              </h2>
              <p className="mt-4">
                <span className="font-display text-4xl font-medium text-ink-900">{tier.price}</span>
                <span className="text-sm text-ink-300"> {tier.unit}</span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-lilac-600">
                {tier.timeline}
              </p>
              <p className="mt-5 text-sm text-ink-500 leading-relaxed">
                <span className="font-medium text-ink-900">{c.forWho} · </span>
                {tier.buyer}
              </p>
              <ul className="mt-4 mb-6 space-y-2 text-sm text-ink-700 leading-relaxed list-disc pl-5 marker:text-lilac-400">
                {tier.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2.5">
                {primaryIsPay ? (
                  <>
                    <a href={pay} className="btn-primary justify-center">{c.payNow}</a>
                    <a href={BOOK_LINK} target="_blank" rel="noreferrer" className="btn-ghost justify-center">
                      {c.bookCall}
                    </a>
                  </>
                ) : (
                  <>
                    <a href={BOOK_LINK} target="_blank" rel="noreferrer" className="btn-primary justify-center">
                      {c.bookCall}
                    </a>
                    {pay ? (
                      <a href={pay} className="btn-ghost justify-center">{c.payNow}</a>
                    ) : null}
                  </>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="glass rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 -mt-12 sm:-mt-16">
        <div className="md:w-56 flex-shrink-0">
          <span className="chip">{c.openCall.tag}</span>
          <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-ink-900 leading-tight">
            {c.openCall.name}
          </h2>
          <p className="mt-3">
            <span className="font-display text-4xl font-medium text-ink-900">{c.openCall.price}</span>
            <span className="text-sm text-ink-300"> {c.openCall.unit}</span>
          </p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-ink-500 leading-relaxed">{c.openCall.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {c.openCall.topics.map((topic) => (
              <span key={topic} className="chip">{topic}</span>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-300">{c.openCall.note}</p>
        </div>
        <a
          href={OPEN_CALL_LINK}
          target="_blank"
          rel="noreferrer"
          className="btn-primary justify-center flex-shrink-0"
        >
          {c.openCall.cta}
        </a>
      </section>

      <section>
        <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900 mb-6">
          {c.stepsTitle}
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {c.steps.map((s, i) => (
            <li key={s.title} className="glass rounded-2xl p-5">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-gradient-to-br from-blush-400 to-lilac-400 text-white text-sm font-medium">
                {i + 1}
              </span>
              <p className="mt-3 font-medium text-ink-900">{s.title}</p>
              <p className="mt-1 text-sm text-ink-500 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-3xl">
        <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-900 mb-6">
          {c.faqTitle}
        </h2>
        <div className="space-y-3">
          {c.faqs.map((f) => (
            <details key={f.q} className="glass rounded-2xl px-5 py-4 group">
              <summary className="cursor-pointer font-medium text-ink-900">{f.q}</summary>
              <p className="mt-2 text-sm text-ink-500 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="glass-strong rounded-3xl px-6 sm:px-10 py-10 sm:py-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink-900 mb-3">
          {c.ctaTitle}
        </h2>
        <p className="text-ink-500 mb-6">{c.ctaBody}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={EMAIL_HREF} className="btn-primary">{EMAIL_LABEL}</a>
          <a href={BOOK_LINK} target="_blank" rel="noreferrer" className="btn-ghost">{c.bookCall}</a>
        </div>
      </section>
    </div>
  );
}
