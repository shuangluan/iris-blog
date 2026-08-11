"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Writing" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "About" }
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-3 z-50 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto glass rounded-full px-4 sm:px-5 py-2.5 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-gradient-to-br from-blush-400 to-lilac-400 text-white text-sm">
            ✿
          </span>
          <span className="font-medium text-ink-900 text-sm sm:text-base tracking-tight">
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
                className="pill-nav"
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
