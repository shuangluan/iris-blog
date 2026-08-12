# Iris Luan — Personal Blog

A Next.js 14 (App Router) blog with a soft-modern aesthetic — peach → blush →
lilac gradient backdrop, glass-morphism cards, Fraunces serif display + Inter
body, subtle motion. All content lives as MDX files you edit by hand.

**Five categories:** `notes` (POV / reflections / small essays — the 公众号
corner), `case-study`, `travel`, `life` (US ⇄ CN), `side-project`.

**Stack:** Next.js 14 · TypeScript · Tailwind · MDX · Giscus · Vercel Analytics
+ Plausible (optional)

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

