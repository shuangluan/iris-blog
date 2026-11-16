import Link from "next/link";
import { t } from "@/lib/i18n";
import { getLang } from "@/lib/lang-server";

export default function NotFound() {
  const d = t(getLang()).notFound;
  return (
    <div className="column" style={{ paddingBottom: "var(--space-8)" }}>
      <p className="eyebrow">404</p>
      <h1 className="page-title">
        {d.h1a} {d.h1b}
      </h1>
      <p className="dek">{d.body}</p>
      <p className="link-row" style={{ marginTop: "1.5rem" }}>
        <Link href="/">{d.home}</Link>
        <Link href="/writing">{d.all}</Link>
      </p>
    </div>
  );
}
