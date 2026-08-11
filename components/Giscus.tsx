"use client";
import GiscusReact from "@giscus/react";

export default function Comments() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !categoryId) {
    return (
      <div className="glass rounded-2xl p-6 text-sm text-ink-700">
        <div className="text-xs uppercase tracking-widest text-lilac-600 mb-2">
          Guestbook (not yet wired up)
        </div>
        <p className="leading-relaxed">
          Comments are powered by{" "}
          <a
            href="https://giscus.app"
            className="underline decoration-lilac-200 underline-offset-4 hover:text-ink-900"
            target="_blank"
            rel="noreferrer"
          >
            Giscus
          </a>{" "}
          + GitHub Discussions. Add the four <code className="text-lilac-600">NEXT_PUBLIC_GISCUS_*</code>{" "}
          env vars from <code className="text-lilac-600">.env.example</code> and this
          box turns into a real comment thread. See <code className="text-lilac-600">README.md</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-4">
      <GiscusReact
        id="comments"
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category ?? "Announcements"}
        categoryId={categoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
