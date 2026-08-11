import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!)
  );

export function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://irisluan.com";
  const posts = getAllPosts();
  const items = posts
    .map(
      (p) => `
    <item>
      <title>${escape(p.title)}</title>
      <link>${site}/posts/${p.slug}</link>
      <guid>${site}/posts/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escape(p.description)}</description>
      ${p.tags.map((t) => `<category>${escape(t)}</category>`).join("")}
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Iris Luan</title>
    <link>${site}</link>
    <description>Essays, case studies, travel notes, and side products.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/xml; charset=utf-8" }
  });
}
