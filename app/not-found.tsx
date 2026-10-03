import Link from "next/link";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/lang-server";

export default function NotFound() {
  const d = t(getLang()).notFound;
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <span className="chip mb-6">HTTP 404</span>
      <h1 className="font-display text-7xl sm:text-8xl font-medium tracking-tight leading-[0.95] text-ink-900">
        {d.h1a} <span className="gradient-text italic">{d.h1b}</span>
      </h1>
      <p className="mt-5 text-lg text-ink-500 max-w-md mx-auto">
        {d.body}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">{d.home}</Link>
        <Link href="/posts" className="btn-ghost">{d.all}</Link>
      </div>
    </div>
  );
}
