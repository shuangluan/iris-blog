const HAN = /\p{Script=Han}/u;

export function hasHan(value: string) {
  return HAN.test(value);
}

export function titleClass(base: string, text: string) {
  return hasHan(text) ? `${base} is-mixed` : base;
}

/** lang for a string that may be Han inside an English page (and the reverse). */
export function textLang(text: string, page: "en" | "zh"): "zh-CN" | "en" | undefined {
  const han = hasHan(text);
  if (han && page !== "zh") return "zh-CN";
  if (!han && page === "zh") return "en";
  return undefined;
}

/**
 * The article header already shows the dek. A few posts repeat that exact
 * sentence as the opening blockquote. Drop only that duplicate at render time.
 */
export function stripDuplicateDek(source: string, description: string) {
  const norm = (s: string) => s.replace(/\s+/g, " ").trim();
  const desc = norm(description);
  if (!desc) return source;
  const lines = source.replace(/^\uFEFF/, "").split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (!lines[i]?.startsWith(">")) return source;
  const quote: string[] = [];
  while (i < lines.length && lines[i].startsWith(">")) {
    quote.push(lines[i].replace(/^>\s?/, ""));
    i++;
  }
  if (norm(quote.join(" ")) !== desc) return source;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (lines[i]?.trim() === "---") {
    i++;
    while (i < lines.length && lines[i].trim() === "") i++;
  }
  return lines.slice(i).join("\n");
}
