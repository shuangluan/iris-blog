import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://irisluan.com";
  const posts = getAllPosts().map((p) => ({
    url: `${site}/posts/${p.slug}`,
    lastModified: new Date(p.date)
  }));
  const tags = getAllTags().map(({ tag }) => ({
    url: `${site}/tags/${tag}`,
    lastModified: new Date()
  }));
  return [
    { url: site, lastModified: new Date() },
    { url: `${site}/posts`, lastModified: new Date() },
    { url: `${site}/tags`, lastModified: new Date() },
    { url: `${site}/about`, lastModified: new Date() },
    ...posts,
    ...tags
  ];
}
