"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Lang } from "@/lib/i18n";
import LangToggle from "./LangToggle";

export default function Nav({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const d = t(lang);
  const links = [
    { href: "/", label: d.nav.home },
    { href: "/posts", label: d.nav.writing },
    { href: "/tags", label: d.nav.tags },
    { href: "/services", label: d.nav.services },
    { href: "/about", label: d.nav.about }
  ];
  return (
    <header className="sticky top-3 z-50 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto glass rounded-full px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 sm:gap-3">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-gradient-to-br from-blush-400 to-lilac-400 text-white text-sm">
            ✿
          </span>
          <span className="hidden sm:inline font-medium text-ink-900 text-base tracking-tight">
            iris.luan
          </span>
        </Link>
        <nav className="flex items-center gap-0.5">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                data-active={active}
                // Home is reachable via the logo, so drop it on small screens to fit
                className={`pill-nav${l.href === "/" ? " hidden sm:inline-flex" : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
          <LangToggle lang={lang} label={d.toggle.label} aria={d.toggle.aria} />
        </nav>
      </div>
    </header>
  );
}
