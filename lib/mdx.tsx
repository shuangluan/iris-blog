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
  table: (props) => (
    <div className="table-scroll" role="region" tabIndex={0} aria-label="Table">
      <table {...props} />
    </div>
  ),
  blockquote: (props) => <blockquote {...props} />,
  Callout: ({ children }: { children: React.ReactNode; tone?: string }) => (
    <aside className="note">
      <p className="meta-label">Note</p>
      <div>{children}</div>
    </aside>
  )
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
