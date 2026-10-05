// Site-wide UI language. Post *content* has its own language (frontmatter `lang`);
// this controls the chrome around it and which version of a translated post is listed.

export type Lang = "en" | "zh";
export const LANGS: Lang[] = ["en", "zh"];
export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "lang";

// hreflang codes used in <link rel="alternate">
export const HREFLANG: Record<Lang, string> = { en: "en", zh: "zh-CN" };

export function isLang(v: unknown): v is Lang {
  return v === "en" || v === "zh";
}

export function formatDate(
  iso: string,
  lang: Lang,
  style: "short" | "long" | "compact" = "short"
) {
  const d = new Date(iso);
  const locale = lang === "zh" ? "zh-CN" : "en-US";
  if (style === "long")
    return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
  if (style === "compact")
    return d.toLocaleDateString(locale, { year: "2-digit", month: "short", day: "numeric" });
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

export function readingLabel(minutes: number, lang: Lang) {
  const m = Math.max(1, Math.round(minutes));
  return lang === "zh" ? `${m} 分钟读完` : `${m} min read`;
}

const en = {
  nav: { home: "Home", writing: "Writing", tags: "Tags", services: "Services", about: "About" },
  toggle: { label: "中文", aria: "切换到中文" },
  categories: {
    notes: "Notes",
    "case-study": "Case Studies",
    travel: "Travel",
    life: "US ⇄ CN Life",
    "side-project": "Side Projects"
  },
  blurbs: {
    notes: "POV, reflections, small essays. The public account corner.",
    "case-study": "Walk-throughs of things I've shipped or dissected.",
    travel: "Half itinerary, half feelings. From wherever I last landed.",
    life: "Weekly whiplash of living between two countries.",
    "side-project": "Small products that started as one bad Sunday idea."
  },
  home: {
    chip: "Writing since 2026 · Shanghai ⇄ NY",
    h1a: "Small notes from",
    h1b: "a life between two coasts.",
    intro:
      "I'm Iris. This is where I keep my longer thoughts: reflections, case studies of things I've shipped, travel journals, and the small products I keep making on weekends.",
    start: "Start reading →",
    aboutMe: "About me",
    find: "What you'll find here",
    allTags: "All tags →",
    latest: "Latest",
    more: "More writing",
    seeAll: "See all posts →",
    nlChip: "Newsletter",
    nlTitleA: "New posts, straight to",
    nlTitleB: "your inbox.",
    nlBody: "One email when I publish. No threads, no \"10 things\", no spam."
  },
  card: { latest: "Latest" },
  posts: {
    count: (n: number) => `✦ ${n} posts`,
    h1a: "Everything I've",
    h1b: "written.",
    introA: "Sorted newest-first, grouped by kind. Or browse by",
    introTag: "tag"
  },
  post: {
    back: "← All writing",
    prev: "← Previous",
    next: "Next →",
    comments: "Say something",
    alsoIn: "Also available in 中文 →",
    onlyIn: "This post is only available in Chinese."
  },
  tags: {
    count: (t: number, p: number) => `✦ ${t} tags · ${p} posts`,
    h1a: "Find something to",
    h1b: "read.",
    byCat: "By category",
    cloud: "Tag cloud",
    empty: "No tags yet.",
    back: "← All tags",
    nPosts: (n: number) => `✦ ${n} ${n === 1 ? "post" : "posts"}`,
    none: "No posts with this tag yet."
  },
  share: {
    title: "Share this",
    wechat: "WeChat / Moments",
    copy: "Copy link",
    copied: "✓ Copied"
  },
  tip: {
    body: "If this landed for you, consider dropping me a coffee. It keeps me writing on the weekends instead of doom-scrolling.",
    cta: "Buy me a coffee →"
  },
  newsletter: {
    placeholder: "you@somewhere.com",
    subscribe: "Subscribe",
    loading: "Subscribing…",
    already: "You're already on the list.",
    confirm: "Check your inbox to confirm.",
    notWired: "Newsletter isn't wired up yet. Check back soon.",
    error: "Something went wrong. Try again?",
    network: "Network error. Try again?"
  },
  comments: { offline: "Guestbook (not yet wired up)" },
  footer: {
    tagline: "Writing from somewhere.",
    elsewhere: "Elsewhere",
    rss: "RSS feed",
    vibe: "Vibe check",
    built: (y: number) => `© ${y} Iris Luan. Built with care in ${y}.`,
    readers: "readers ever"
  },
  notFound: {
    h1a: "Not",
    h1b: "here.",
    body: "This page isn't on the server. Maybe it never was, or maybe you're early.",
    home: "Home",
    all: "All posts"
  }
};

export type Dict = typeof en;

const zh: Dict = {
  nav: { home: "首页", writing: "文章", tags: "标签", services: "服务", about: "关于" },
  toggle: { label: "EN", aria: "Switch to English" },
  categories: {
    notes: "随笔",
    "case-study": "案例复盘",
    travel: "旅行",
    life: "中美生活",
    "side-project": "个人项目"
  },
  blurbs: {
    notes: "观点、反思、小随笔。公众号式的那一角。",
    "case-study": "做过的、拆解过的产品复盘。",
    travel: "一半行程，一半感受。从我刚落地的地方写。",
    life: "在两个国家之间来回切换的日常。",
    "side-project": "周末一个念头开始的小产品。"
  },
  home: {
    chip: "2026 年开始写 · 上海 ⇄ 纽约",
    h1a: "在两座海岸城市之间，",
    h1b: "写下生活的小笔记。",
    intro:
      "我是 Iris。这里放我比较长的想法：反思、做过的产品复盘、旅行笔记，还有我周末一直在做的小产品。",
    start: "开始阅读 →",
    aboutMe: "关于我",
    find: "这里有什么",
    allTags: "全部标签 →",
    latest: "最新",
    more: "更多文章",
    seeAll: "查看全部文章 →",
    nlChip: "邮件订阅",
    nlTitleA: "新文章，",
    nlTitleB: "直接到你的邮箱。",
    nlBody: "我发新文章时发一封邮件。没有长串推送，没有标题党，没有垃圾邮件。"
  },
  card: { latest: "最新" },
  posts: {
    count: (n: number) => `✦ ${n} 篇`,
    h1a: "我写过的",
    h1b: "所有文章。",
    introA: "按时间倒序，按类别分组。也可以按",
    introTag: "标签浏览"
  },
  post: {
    back: "← 全部文章",
    prev: "← 上一篇",
    next: "下一篇 →",
    comments: "留个言",
    alsoIn: "Read in English →",
    onlyIn: "这篇文章目前只有英文版。"
  },
  tags: {
    count: (t: number, p: number) => `✦ ${t} 个标签 · ${p} 篇文章`,
    h1a: "找点",
    h1b: "想读的。",
    byCat: "按类别",
    cloud: "标签云",
    empty: "还没有标签。",
    back: "← 全部标签",
    nPosts: (n: number) => `✦ ${n} 篇`,
    none: "这个标签下还没有文章。"
  },
  share: {
    title: "分享",
    wechat: "微信 / 朋友圈",
    copy: "复制链接",
    copied: "✓ 已复制"
  },
  tip: {
    body: "如果这篇对你有用，可以请我喝杯咖啡。它让我周末继续写字，而不是刷手机。",
    cta: "请我喝杯咖啡 →"
  },
  newsletter: {
    placeholder: "你的邮箱",
    subscribe: "订阅",
    loading: "订阅中…",
    already: "你已经订阅过了。",
    confirm: "请去邮箱确认订阅。",
    notWired: "订阅功能还没接好，稍后再来。",
    error: "出了点问题，再试一次？",
    network: "网络错误，再试一次？"
  },
  comments: { offline: "留言板（尚未开通）" },
  footer: {
    tagline: "在某个地方写字。",
    elsewhere: "其他地方",
    rss: "RSS 订阅",
    vibe: "小统计",
    built: (y: number) => `© ${y} Iris Luan。${y} 年用心搭建。`,
    readers: "位读者来过"
  },
  notFound: {
    h1a: "这里",
    h1b: "什么也没有。",
    body: "这个页面不在服务器上。也许从来没存在过，也许你来早了。",
    home: "首页",
    all: "全部文章"
  }
};

export const DICTS: Record<Lang, Dict> = { en, zh };
export function t(lang: Lang): Dict {
  return DICTS[lang];
}
