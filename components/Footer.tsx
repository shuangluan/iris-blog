import VisitorBadge from "./VisitorBadge";

export default function Footer() {
  return (
    <footer className="mt-20 px-3 sm:px-4 pb-6">
      <div className="max-w-5xl mx-auto glass rounded-3xl px-6 sm:px-10 py-10 grid gap-8 md:grid-cols-3 text-sm text-ink-700">
        <div>
          <div className="font-display text-xl text-ink-900 mb-2 tracking-tight">
            iris.luan
          </div>
          <p className="leading-relaxed text-ink-500">
            Writing from somewhere.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-lilac-600 mb-3">
            Elsewhere
          </div>
          <ul className="space-y-1.5">
            <li><a href="mailto:hi@irisluan.com" className="hover:text-ink-900 underline decoration-lilac-200 underline-offset-4">hi@irisluan.com</a></li>
            <li><a href="https://x.com/Iris_LS_Luan" className="hover:text-ink-900 underline decoration-lilac-200 underline-offset-4">Twitter / X</a></li>
            <li><a href="https://github.com/shuangluan" className="hover:text-ink-900 underline decoration-lilac-200 underline-offset-4">GitHub</a></li>
            <li><a href="/rss.xml" className="hover:text-ink-900 underline decoration-lilac-200 underline-offset-4">RSS feed</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-lilac-600 mb-3">
            Vibe check
          </div>
          <VisitorBadge />
          <p className="mt-3 text-ink-500 text-xs leading-relaxed">
            © {new Date().getFullYear()} Iris Luan. Built with care in {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </footer>
  );
}
