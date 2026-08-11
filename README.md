# Iris Luan — Personal Blog

A Next.js 14 (App Router) blog with a soft-modern aesthetic — peach → blush →
lilac gradient backdrop, glass-morphism cards, Fraunces serif display + Inter
body, subtle motion. All content lives as MDX files you edit by hand.

**Five categories:** `notes` (POV / reflections / small essays — the 公众号
corner), `case-study`, `travel`, `life` (US ⇄ CN), `side-project`.

**Stack:** Next.js 14 · TypeScript · Tailwind · MDX · Giscus · Vercel Analytics
+ Plausible (optional)

---

## Quick start

```bash
npm install
cp .env.example .env.local     # optional at first — see "Comments" below
npm run dev                    # http://localhost:3000
```

Build & self-check:

```bash
npm run build
npm start
```

---

## Adding a post

1. Drop a new file in `content/posts/`, e.g. `content/posts/my-first-real-post.mdx`.
2. Frontmatter — everything but `title`/`date` is optional:

   ```mdx
   ---
   title: "The One About the Thing"
   description: "One-sentence hook. Shows in list cards + OG tags."
   date: 2026-08-15
   category: notes            # notes | case-study | travel | life | side-project
   tags: ["writing", "meta"]
   cover: ""                  # optional image URL
   ---

   Your markdown here. Full GFM support (tables, task lists, footnotes).
   Custom components exposed in `lib/mdx.tsx`, e.g.:

   <Callout tone="pink">Highlight box.</Callout>
   ```

3. The filename becomes the URL slug (`/posts/my-first-real-post`).
4. Save → the dev server hot-reloads. `npm run build` regenerates static pages
   for every post via `generateStaticParams`.

**Five categories are baked in.** To add or rename them, edit the `Category`
union and `CATEGORY_LABELS` in `lib/posts.ts`, and the palette + emoji arrays
in `app/page.tsx` and `app/tags/page.tsx`.

---

## Comments (Giscus + GitHub Discussions)

Comments are stored as GitHub Discussions threads. Free, spam-resistant, no DB.

1. Push this repo to GitHub (public or private both work — public is easier).
2. Enable **Discussions** on the repo: Settings → General → Features.
3. Install the [Giscus app](https://github.com/apps/giscus) on the repo.
4. Go to <https://giscus.app>, paste your repo, pick a category
   (`Announcements` is fine), and copy the four values it prints.
5. Fill them into `.env.local` (see `.env.example`):
   ```
   NEXT_PUBLIC_GISCUS_REPO=irisluan/iris-blog
   NEXT_PUBLIC_GISCUS_REPO_ID=R_xxx
   NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxx
   ```
6. Redeploy. The offline placeholder on each post page becomes a live thread.

Prefer something else? Swap `components/Giscus.tsx` for
[Utterances](https://utteranc.es), [Cusdis](https://cusdis.com), or a
webhook — the file exports one default `<Comments />` component that the post
page imports.

---

## Analytics

**Vercel Analytics** and **Speed Insights** are wired in `app/layout.tsx` via
`@vercel/analytics/react` and `@vercel/speed-insights/next`. They activate
automatically once the project is deployed on Vercel and you toggle Analytics
on in the Vercel dashboard. No config needed.

**Plausible (optional, self-hosted or plausible.io):** set

```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=irisluan.com
```

in `.env.local` and a `<script>` tag is injected in `app/layout.tsx`.

**On-site visitor badge:** the retro 7-digit counter in the footer
(`components/VisitorBadge.tsx`) is browser-local — it's the vibe, not the truth.
To make it real, replace the `useEffect` with a `fetch('/api/hits')` call and
add an API route backed by Vercel KV / Upstash / SQLite. Contract stays the same.

---

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Add the env vars from `.env.example` in **Project → Settings → Environment
   Variables** (all `NEXT_PUBLIC_*`).
4. Deploy. Set your custom domain under **Settings → Domains**.

Also runs on Netlify, Cloudflare Pages, or `next start` behind any Node host.

---

## Project map

```
app/
├─ layout.tsx           root layout · fonts · Marquee · Analytics
├─ page.tsx             HOME · hero · category tiles · latest posts · newsletter
├─ globals.css          Soft-modern design system (glass, chip, btn-primary, prose-soft, ...)
├─ not-found.tsx        404 page
├─ robots.ts            /robots.txt
├─ sitemap.ts           /sitemap.xml
├─ rss.xml/route.ts     /rss.xml
├─ about/page.tsx       About / bio / now-page / links
├─ posts/
│   ├─ page.tsx         all posts, grouped by category
│   └─ [slug]/page.tsx  single post · Markdown/MDX · prev-next · comments
└─ tags/
    ├─ page.tsx         tag cloud + by-category index
    └─ [tag]/page.tsx   posts filtered by one tag

components/
├─ Nav.tsx              sticky nav with Win98 buttons
├─ Footer.tsx           links + visitor badge + copyright
├─ Marquee.tsx          the "★ NEW POST DROPPED ★" scroller
├─ PostCard.tsx         Win98-window styled card
├─ VisitorBadge.tsx     retro 7-digit counter (localStorage)
├─ Giscus.tsx           comments (or graceful placeholder if not configured)
└─ BlinkText.tsx        <blink>

lib/
├─ posts.ts             MDX reader · listing/tag/category APIs
└─ mdx.tsx              MDX render pipeline · custom components

content/posts/*.mdx     ← YOUR CONTENT LIVES HERE
public/favicon.svg      pink+cyan star favicon
```

---

## Customization checklist

Look for `___` placeholders and swap them for real content:

- [ ] `app/about/page.tsx` — bio, "currently" list, projects, socials
- [ ] `components/Footer.tsx` — email, social handles
- [ ] `content/posts/*.mdx` — replace all 5 template posts
- [ ] `app/layout.tsx` — site title, description, `metadataBase` URL
- [ ] `.env.local` — Giscus + Plausible + `NEXT_PUBLIC_SITE_URL`
- [ ] `components/Marquee.tsx` — the scrolling text items
- [ ] `public/favicon.svg` — replace with your own SVG if desired

Enjoy. 🌐✨
