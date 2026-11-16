// Curl each route and assert the desktop nav has exactly one aria-current,
// on the expected href. The mobile menu repeats that same current link.
// Usage: node scripts/nav-audit.mjs [baseUrl]

const base = process.argv[2] || "http://127.0.0.1:3456";

const cases = [
  { path: "/", expect: "/", label: "Home" },
  { path: "/writing", expect: "/writing", label: "Writing" },
  { path: "/writing?tag=notes", expect: "/writing", label: "Writing" },
  { path: "/writing?tag=SEO", expect: "/writing", label: "Writing" },
  { path: "/writing?tag=does-not-exist", expect: "/writing", label: "Writing" },
  { path: "/projects", expect: "/projects", label: "Projects" },
  { path: "/services", expect: "/services", label: "Services" },
  { path: "/about", expect: "/about", label: "About" },
  { path: "/posts/seo-geo-7-weeks-en", expect: "/writing", label: "Writing" },
  { path: "/posts/seo-geo-7-weeks", expect: "/writing", label: "文章" },
  { path: "/no-such-page", expect: null, label: null },
  { path: "/", cookie: "lang=zh", expect: "/", label: "首页" },
  { path: "/writing", cookie: "lang=zh", expect: "/writing", label: "文章" },
  { path: "/projects", cookie: "lang=zh", expect: "/projects", label: "项目" },
  { path: "/services", cookie: "lang=zh", expect: "/services", label: "服务" },
  { path: "/about", cookie: "lang=zh", expect: "/about", label: "关于" }
];

function navBlock(html, marker) {
  const start = html.indexOf(marker);
  if (start < 0) return "";
  const slice = html.slice(start);
  const end = slice.indexOf("</nav>");
  return end < 0 ? slice : slice.slice(0, end);
}

function currents(block) {
  const found = [];
  const re = /<a\b([^>]*)>([^<]*)<\/a>/g;
  let m;
  while ((m = re.exec(block))) {
    const attrs = m[1];
    if (!/aria-current="page"/.test(attrs)) continue;
    const href = attrs.match(/href="([^"]*)"/);
    found.push({ href: href ? href[1] : "", label: m[2] });
  }
  return found;
}

let failed = 0;
for (const c of cases) {
  const res = await fetch(base + c.path, {
    headers: c.cookie ? { cookie: c.cookie } : {},
    redirect: "follow"
  });
  const html = await res.text();
  const desktop = currents(navBlock(html, 'data-nav="desktop"'));
  const mobile = currents(navBlock(html, 'data-nav="mobile"'));
  const okDesktop =
    c.expect === null
      ? desktop.length === 0
      : desktop.length === 1 && desktop[0].href === c.expect && desktop[0].label === c.label;
  const okMobile =
    c.expect === null
      ? mobile.length === 0
      : mobile.length === 1 && mobile[0].href === c.expect && mobile[0].label === c.label;
  const ok = res.status < 500 && okDesktop && okMobile;
  if (!ok) failed += 1;
  const shown = desktop.map((d) => `${d.label} ${d.href}`).join(", ") || "(none)";
  console.log(
    `${ok ? "ok" : "FAIL"} ${res.status} ${c.cookie ? "[zh] " : ""}${c.path} -> ${shown}`
  );
}

if (failed) {
  console.error(`\n${failed} route(s) failed`);
  process.exit(1);
}
console.log(`\n${cases.length} routes passed`);
