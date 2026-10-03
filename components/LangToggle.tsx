"use client";
import { useRouter } from "next/navigation";
import { HREFLANG, LANG_COOKIE, type Lang } from "@/lib/i18n";

/**
 * Flips the UI language cookie. If the current page declares a translation
 * via <link rel="alternate" hreflang="..."> (post pages do), jump to it;
 * otherwise just re-render the current page in the other language.
 */
export default function LangToggle({
  lang,
  label,
  aria
}: {
  lang: Lang;
  label: string;
  aria: string;
}) {
  const router = useRouter();
  const target: Lang = lang === "en" ? "zh" : "en";

  function onClick() {
    document.cookie = `${LANG_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
    const alt = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${HREFLANG[target]}"]`
    );
    if (alt?.href) {
      const url = new URL(alt.href);
      if (url.pathname !== window.location.pathname) {
        router.push(url.pathname);
        router.refresh();
        return;
      }
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      className="pill-nav ml-1 border border-lilac-200/60"
    >
      {label}
    </button>
  );
}
