import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";
import LangToggle from "./LangToggle";

function active(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href === "/writing") return pathname === "/writing" || pathname.startsWith("/posts/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav({
  lang,
  pathname,
  from
}: {
  lang: Lang;
  pathname: string;
  from: string;
}) {
  const d = t(lang);
  const links = [
    { href: "/", label: d.nav.home },
    { href: "/writing", label: d.nav.writing },
    { href: "/projects", label: d.nav.projects },
    { href: "/services", label: d.nav.services },
    { href: "/about", label: d.nav.about }
  ];
  const linkNodes = (suffix: string) =>
    links.map((l) => {
      const on = active(l.href, pathname);
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
        <nav className="desktop-nav" aria-label={lang === "zh" ? "主导航" : "Primary"}>
          {linkNodes("d")}
          <LangToggle lang={lang} from={from} />
        </nav>
        <div className="mobile-tools">
          <LangToggle lang={lang} from={from} />
          <details className="mobile-menu">
            <summary className="menu-summary">{d.nav.menu}</summary>
            <nav className="menu-panel" aria-label={lang === "zh" ? "主导航" : "Primary"}>
              {linkNodes("m")}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
