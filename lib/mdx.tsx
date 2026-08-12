import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  a: (props) => (
    <a
      {...props}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
    />
  ),
  Callout: ({
    children,
    tone = "lilac"
  }: {
    children: React.ReactNode;
    tone?: "lilac" | "blush" | "peach";
  }) => {
    const bg =
      tone === "blush"
        ? "linear-gradient(135deg, #fce4ec 0%, #fef3e8 100%)"
        : tone === "peach"
        ? "linear-gradient(135deg, #fef3e8 0%, #fbeaea 100%)"
        : "linear-gradient(135deg, #efe9ff 0%, #fce4ec 100%)";
    const border =
      tone === "blush" ? "#f8bacd" : tone === "peach" ? "#fbd6b8" : "#d4c6f7";
    const text =
      tone === "blush" ? "#a53063" : tone === "peach" ? "#a25121" : "#5e3aa1";
    return (
      <div
        className="my-6 rounded-2xl p-5"
        style={{ background: bg, border: `0.5px solid ${border}` }}
      >
        <div
          className="uppercase text-[11px] tracking-widest mb-2 font-medium"
          style={{ color: text }}
        >
          Note
        </div>
        <div className="text-ink-900">{children}</div>
      </div>
    );
  }
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug]
        }
      }}
    />
  );
}
