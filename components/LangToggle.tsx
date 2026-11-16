import { t, type Lang } from "@/lib/i18n";

/** Full navigation so the cookie is set without JavaScript. */
export default function LangToggle({ lang, from }: { lang: Lang; from: string }) {
  const target: Lang = lang === "en" ? "zh" : "en";
  const d = t(lang).toggle;
  const href = `/lang?to=${target}&from=${encodeURIComponent(from || "/")}`;
  return (
    <a className="lang-toggle" href={href} hrefLang={target === "zh" ? "zh-CN" : "en"} aria-label={d.aria}>
      {d.label}
    </a>
  );
}
