import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <span className="chip mb-6">HTTP 404</span>
      <h1 className="font-display text-7xl sm:text-8xl font-medium tracking-tight leading-[0.95] text-ink-900">
        Not <span className="gradient-text italic">here.</span>
      </h1>
      <p className="mt-5 text-lg text-ink-500 max-w-md mx-auto">
        This page isn't on the server. Maybe it never was — or maybe you're
        early.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/posts" className="btn-ghost">All posts</Link>
      </div>
    </div>
  );
}
