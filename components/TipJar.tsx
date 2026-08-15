/**
 * Buy Me a Coffee tip jar.
 *
 * Reads the username from NEXT_PUBLIC_BUYMEACOFFEE_USERNAME. If unset, the
 * component renders nothing — no visual placeholder, so it stays invisible
 * on the site until you're ready.
 *
 * Placement: at the end of every post, before prev/next nav.
 */
export default function TipJar() {
  const username = process.env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME?.trim();
  if (!username) return null;

  return (
    <div className="my-10 rounded-3xl glass px-6 py-8 text-center">
      <div className="text-3xl mb-3" aria-hidden>
        ☕
      </div>
      <p className="text-ink-700 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-5">
        If this landed for you, consider dropping me a coffee — it keeps me
        writing on the weekends instead of doom-scrolling.
      </p>
      <a
        href={`https://www.buymeacoffee.com/${username}`}
        target="_blank"
        rel="noreferrer"
        className="btn-primary"
      >
        Buy me a coffee →
      </a>
    </div>
  );
}
