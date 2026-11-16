import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, getPostsByTag, getTranslation } from "@/lib/posts";
import { HREFLANG } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0] ? new Date(posts[0].date) : new Date();

  const postEntries = posts.map((p) => {
    const translation = getTranslation(p);
    const languages: Record<string, string> = {
      [HREFLANG[p.lang]]: absoluteUrl(`/posts/${p.slug}`)
    };
    if (translation) {
      languages[HREFLANG[translation.lang]] = absoluteUrl(`/posts/${translation.slug}`);
    }
    return {
      url: absoluteUrl(`/posts/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: p.category === "case-study" ? 0.8 : 0.7,
      ...(translation ? { alternates: { languages } } : {})
    };
  });

  // Tag filters with 2+ posts. Single-post filters stay noindex on /writing.
  const tagEntries = getAllTags()
    .filter(({ tag }) => getPostsByTag(tag, "en").length >= 2)
    .map(({ tag }) => ({
      url: absoluteUrl(`/writing?tag=${encodeURIComponent(tag)}`),
      lastModified: new Date(getPostsByTag(tag)[0].date),
      changeFrequency: "weekly" as const,
      priority: 0.4
    }));

  return [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/writing"), lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    ...postEntries,
    ...tagEntries
  ];
}
