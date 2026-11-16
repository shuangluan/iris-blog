import { t, type Lang } from "@/lib/i18n";

export default function TipJar({ lang = "en" }: { lang?: Lang }) {
  const d = t(lang);
  const username = process.env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME?.trim();
  if (!username) return null;

  return (
    <aside className="tip">
      <p className="one-line" style={{ marginTop: 0 }}>
        {d.tip.body}
      </p>
      <p style={{ marginTop: "1rem" }}>
        <a
          href={`https://www.buymeacoffee.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          {d.tip.cta}
        </a>
      </p>
    </aside>
  );
}
