import type { Lang } from "./i18n";

export type ProjectStatus = "current" | "past" | "unknown";

export type Project = {
  id: string;
  name: Record<Lang, string>;
  /** True when the name itself is a placeholder, not a product name. */
  nameTodo?: boolean;
  status: ProjectStatus;
  oneLine?: Record<Lang, string>;
  oneLineTodo?: boolean;
  role?: Record<Lang, string>;
  roleTodo?: boolean;
  period?: Record<Lang, string>;
  url?: string;
  urlLabel?: string;
  /** Match posts whose tag or title names this project. Not a body search. */
  relatedNeedle?: string;
  showOnHome?: boolean;
};

// Only facts already on the site. Unknown fields are omitted or marked TODO.
export const PROJECTS: Project[] = [
  {
    id: "zeai",
    name: { en: "ZEAI", zh: "ZEAI" },
    status: "current",
    oneLineTodo: true,
    role: { en: "Solo builder", zh: "独立开发" },
    url: "https://zeai.ai",
    urlLabel: "zeai.ai"
  },
  {
    id: "verbatim",
    name: { en: "Verbatim", zh: "Verbatim" },
    status: "current",
    oneLine: {
      en: "A search engine over real human experience, indexing podcast conversations. In alpha.",
      zh: "一个基于真人经验的搜索引擎，索引播客对话内容。Alpha 阶段。"
    },
    role: { en: "Solo builder", zh: "独立开发" },
    period: { en: "Aug 2026 –", zh: "2026年8月 –" },
    url: "https://byverbatim.com",
    urlLabel: "byverbatim.com",
    relatedNeedle: "verbatim",
    showOnHome: true
  },
  {
    id: "site",
    name: { en: "irisluan.com", zh: "irisluan.com" },
    status: "current",
    oneLine: {
      en: "This site: my personal brand home and bilingual writing desk.",
      zh: "就是这个网站：我的个人品牌主页和双语写作空间。"
    },
    role: { en: "Solo", zh: "独立" },
    period: { en: "2026 –", zh: "2026 –" },
    url: "/",
    urlLabel: "irisluan.com"
  },
  {
    id: "onelink",
    name: { en: "OneLink", zh: "OneLink" },
    status: "past",
    oneLine: {
      en: "TikTok's internal operations platform for employee efficiency, supporting multi-role collaboration across global teams. (Details desensitized.)",
      zh: "TikTok 内部员工效率运营平台，支持全球团队多角色协作。（细节已脱敏）"
    },
    role: { en: "PM, ByteDance / TikTok", zh: "产品经理，字节跳动 / TikTok" }
  },
  {
    id: "unnamed-2026",
    name: { en: "[Name TBD]", zh: "[项目名待填]" },
    nameTodo: true,
    status: "unknown",
    oneLine: {
      en: "In 2026 I co-founded a company to explore AI products; currently running solo while I focus on consulting and writing.",
      zh: "2026 年我联合创办了一家公司探索 AI 产品；目前一个人在做，专注于咨询和写作。"
    },
    roleTodo: true,
    period: { en: "2026 –", zh: "2026 –" }
  }
];
