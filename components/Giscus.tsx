"use client";
import GiscusReact from "@giscus/react";
import { t, type Lang } from "@/lib/i18n";

export default function Comments({ lang = "en" }: { lang?: Lang }) {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !categoryId) {
    return (
      <div className="notice">
        <p className="meta-label">{t(lang).comments.offline}</p>
        <p>
          Comments are powered by{" "}
          <a href="https://giscus.app" target="_blank" rel="noreferrer">
            Giscus
          </a>{" "}
          + GitHub Discussions. Add the four <code>NEXT_PUBLIC_GISCUS_*</code> env vars
          from <code>.env.example</code> and this box turns into a real comment thread.
          See <code>README.md</code>.
        </p>
      </div>
    );
  }

  return (
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
      theme="preferred_color_scheme"
      lang={lang === "zh" ? "zh-CN" : "en"}
      loading="lazy"
    />
  );
}
