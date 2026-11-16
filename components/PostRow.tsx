import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { dayNum, monthYear, readingLabel, type Lang } from "@/lib/i18n";
import { textLang, titleClass } from "@/lib/text";

export default function PostRow({ post, lang }: { post: PostMeta; lang: Lang }) {
  return (
    <li>
      <Link href={`/posts/${post.slug}`} className="post-row">
        <span className="date-col">
          <span className="day-num">{dayNum(post.date)}</span>
          <small className="month-year">{monthYear(post.date, lang)}</small>
        </span>
        <span>
          <span className={titleClass("post-title", post.title)} lang={textLang(post.title, lang)}>
            {post.title}
          </span>
          {post.description ? (
            <span
              className={titleClass("post-dek", post.description)}
              lang={textLang(post.description, lang)}
            >
              {post.description}
            </span>
          ) : null}
        </span>
        <span className="read">{readingLabel(post.readingMinutes, lang)}</span>
      </Link>
    </li>
  );
}
