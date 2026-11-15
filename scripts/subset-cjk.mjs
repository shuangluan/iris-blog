// Build-time Noto Serif SC subset (weights 400 and 600 only).
// Corpus + CJK punctuation. Regenerates when the scanned characters change.
// Output is committed; if the hash matches, this is a no-op (Vercel does not
// need fonttools on a clean tree).

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const VERSION = "2";
const OUT_DIR = path.join(ROOT, "public", "fonts");
const CSS_PATH = path.join(ROOT, "app", "cjk-faces.css");
const HASH_PATH = path.join(OUT_DIR, "cjk-subset.hash");
const CACHE = path.join(ROOT, ".cache", "fonts");
const SCAN_DIRS = ["content", "app", "components", "lib"];
const HAN_CHUNK0 = 160;
const HAN_REST = 240;

const SOURCES = [
  {
    weight: "400",
    file: "NotoSerifSC-Regular.otf",
    url: "https://github.com/notofonts/noto-cjk/raw/main/Serif/SubsetOTF/SC/NotoSerifSC-Regular.otf"
  },
  {
    weight: "600",
    file: "NotoSerifSC-SemiBold.otf",
    url: "https://github.com/notofonts/noto-cjk/raw/main/Serif/SubsetOTF/SC/NotoSerifSC-SemiBold.otf"
  }
];

function walk(dir, acc) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "cjk-faces.css") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(md|mdx|ts|tsx)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

function collectHan() {
  const freq = new Map();
  for (const dir of SCAN_DIRS) {
    for (const file of walk(path.join(ROOT, dir), [])) {
      const text = fs.readFileSync(file, "utf8");
      for (const ch of text) {
        const cp = ch.codePointAt(0);
        const han =
          (cp >= 0x3400 && cp <= 0x9fff) ||
          (cp >= 0xf900 && cp <= 0xfaff) ||
          (cp >= 0x20000 && cp <= 0x2ffff);
        if (!han) continue;
        freq.set(cp, (freq.get(cp) ?? 0) + 1);
      }
    }
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .map(([cp]) => cp);
}

function punctuation() {
  const cps = [];
  for (let cp = 0x3000; cp <= 0x303f; cp++) cps.push(cp);
  for (let cp = 0xff00; cp <= 0xffef; cp++) cps.push(cp);
  for (let cp = 0x2010; cp <= 0x201f; cp++) cps.push(cp);
  cps.push(0x00b7, 0x2026);
  return cps;
}

function groupsFor(han) {
  const chunk0 = [...new Set([...punctuation(), ...han.slice(0, HAN_CHUNK0)])];
  const rest = han.slice(HAN_CHUNK0);
  const groups = [chunk0];
  for (let i = 0; i < rest.length; i += HAN_REST) groups.push(rest.slice(i, i + HAN_REST));
  return groups;
}

function hashOf(groups) {
  const body = groups.map((g) => g.join(",")).join("\n");
  return createHash("sha256").update(`${VERSION}\n${body}`).digest("hex");
}

function outputsPresent() {
  const names = [
    "NotoSerifSC-subset-400.woff2",
    "NotoSerifSC-subset-600.woff2"
  ];
  return names.every((n) => fs.existsSync(path.join(OUT_DIR, n))) && fs.existsSync(CSS_PATH);
}

const han = collectHan();
const groups = groupsFor(han);
const hash = hashOf(groups);
const prev = fs.existsSync(HASH_PATH) ? fs.readFileSync(HASH_PATH, "utf8").trim() : "";

if (prev === hash && outputsPresent()) {
  console.log(`CJK subset up to date (${han.length} Han, ${groups.length} chunks).`);
  process.exit(0);
}

fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const src of SOURCES) {
  const dest = path.join(CACHE, src.file);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1_000_000) continue;
  console.log(`Downloading ${src.file}…`);
  execFileSync("curl", ["-fsSL", "-o", dest, src.url], { stdio: "inherit" });
}

const spec = {
  regular: path.join(CACHE, SOURCES[0].file),
  semibold: path.join(CACHE, SOURCES[1].file),
  outDir: OUT_DIR,
  css: CSS_PATH,
  groups
};

const py = path.join(ROOT, "scripts", "subset_cjk.py");
execFileSync("python3", [py], { input: JSON.stringify(spec), stdio: ["pipe", "inherit", "inherit"] });
fs.writeFileSync(HASH_PATH, `${hash}\n`);
console.log(`CJK subset wrote ${groups.length} chunks for ${han.length} Han.`);
