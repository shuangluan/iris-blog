import { getAllPosts } from "@/lib/posts";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site";

export const dynamic = "force-static";

// llms.txt (https://llmstxt.org): a plain-text map of the site for LLM crawlers.
export function GET() {
  const posts = getAllPosts();
  const line = (p: (typeof posts)[number]) =>
    `- [${p.title}](${SITE_URL}/posts/${p.slug})${p.description ? `: ${p.description}` : ""}`;
  const body = `# Iris Luan

> ${SITE_DESCRIPTION}

Iris Luan is an independent AI product consultant and former lead product manager at ByteDance / TikTok. Posts are written in English and Chinese; translated pairs share the same content.

## Pages

- [About](${SITE_URL}/about): background, projects, and contact
- [Services](${SITE_URL}/services): AI product consulting tiers and prices
- [All writing](${SITE_URL}/posts)

## Case studies

${posts.filter((p) => p.category === "case-study").map(line).join("\n")}

## Other posts

${posts.filter((p) => p.category !== "case-study").map(line).join("\n")}
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
}
