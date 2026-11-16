"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Lang } from "@/lib/i18n";
import { navCurrent } from "@/lib/nav";
import LangToggle from "./LangToggle";

/**
 * Client island so the underline follows client navigations. The root layout
 * does not re-render on those navigations, which left Home underlined.
 * The first HTML is still rendered on the server (usePathname is available
 * during SSR), so curl sees aria-current.
 */
export default function Nav({ lang, from }: { lang: Lang; from: string }) {
  const pathname = usePathname() || "/";
  const current = navCurrent(pathname);
  const d = t(lang);
  const links = [
    { href: "/", label: d.nav.home },
    { href: "/writing", label: d.nav.writing },
    { href: "/projects", label: d.nav.projects },
    { href: "/services", label: d.nav.services },
    { href: "/about", label: d.nav.about }
  ];
  const items = (suffix: string) =>
    links.map((l) => {
      const on = current === l.href;
      return (
        <Link key={`${suffix}-${l.href}`} href={l.href} aria-current={on ? "page" : undefined}>
          {l.label}
        </Link>
      );
    });
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="wordmark">
          iris.luan
        </Link>
        <nav className="desktop-nav" data-nav="desktop" aria-label={lang === "zh" ? "主导航" : "Primary"}>
          {items("d")}
          <LangToggle lang={lang} from={from} />
        </nav>
        <div className="mobile-tools">
          <LangToggle lang={lang} from={from} />
          <details className="mobile-menu">
            <summary className="menu-summary">{d.nav.menu}</summary>
            <nav className="menu-panel" data-nav="mobile" aria-label={lang === "zh" ? "主导航" : "Primary"}>
              {items("m")}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
