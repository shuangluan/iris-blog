/** Which primary nav href is current. Home matches only "/". */
export function navCurrent(pathname: string): string | null {
  const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  if (path === "/") return "/";
  if (path === "/writing" || path.startsWith("/writing/") || path === "/posts" || path.startsWith("/posts/")) {
    return "/writing";
  }
  if (path === "/projects" || path.startsWith("/projects/")) return "/projects";
  if (path === "/services" || path.startsWith("/services/")) return "/services";
  if (path === "/about" || path.startsWith("/about/")) return "/about";
  return null;
}
