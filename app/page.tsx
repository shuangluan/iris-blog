import Link from "next/link";
import PostRow from "@/components/PostRow";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllPosts } from "@/lib/posts";
import { PROJECTS } from "@/lib/projects";
import { t, kickerDate, readingLabel } from "@/lib/i18n";
import { getLang } from "@/lib/lang-server";
import { textLang, titleClass } from "@/lib/text";
import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  pageMeta,
  jsonLd,
  personSchema
} from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Iris Luan · AI product notes, case studies & side projects",
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true
});

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: ["en", "zh-CN"],
      publisher: { "@id": `${SITE_URL}/#person` }
    },
    personSchema
  ]
};

export default function HomePage() {
  const lang = getLang();
  const d = t(lang);
  const h = d.home;
  const posts = getAllPosts(lang);
  const [featured, ...rest] = posts;
  const list = rest.slice(0, 4);
  const current = PROJECTS.filter((p) => p.showOnHome);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <header className="mast">
        <div className="mast-inner">
          <h1 className="mast-name">Iris Luan</h1>
          <div className="mast-rule" />
          <div className="mast-meta">
            <p>{h.tagline}</p>
            <p>{h.since}</p>
          </div>
        </div>
      </header>

      <div className="spread">
        {featured ? (
          <section className="lead">
            <div className="feature">
              <p className="kicker">
                {h.latest} · {kickerDate(featured.date, lang)} ·{" "}
                {readingLabel(featured.readingMinutes, lang)}
              </p>
              <h2
                className={titleClass("feature-title", featured.title)}
                lang={textLang(featured.title, lang)}
              >
                <Link href={`/posts/${featured.slug}`}>{featured.title}</Link>
              </h2>
              {featured.description ? (
                <p
                  className={titleClass("dek", featured.description)}
                  lang={textLang(featured.description, lang)}
                >
                  {featured.description}
                </p>
              ) : null}
            </div>
            <aside className="verm" aria-label={h.servicesAria}>
              <p className="verm-title">{h.servicesTitle}</p>
              <Link href="/services" className="verm-cta">
                {h.servicesCta}
              </Link>
            </aside>
          </section>
        ) : null}

        {list.length ? (
          <section>
            <div className="section-head">
              <h2>{h.writingLabel}</h2>
              <Link href="/writing">{h.allWriting}</Link>
            </div>
            <ul className="post-list">
              {list.map((p) => (
                <PostRow key={p.slug} post={p} lang={lang} />
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <div className="measure home-below">
        <section>
          <div className="section-head">
            <h2>{h.projectsLabel}</h2>
            <Link href="/projects">{h.allProjects}</Link>
          </div>
          {current.map((project) => (
            <article key={project.id} className="project-teaser">
              <div className="project-top">
                <h3 className="project-name">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer">
                      {project.name[lang]}
                    </a>
                  ) : (
                    project.name[lang]
                  )}
                </h3>
                <span className="status">{d.projectsPage.current}</span>
              </div>
              {project.oneLine ? <p className="one-line">{project.oneLine[lang]}</p> : null}
            </article>
          ))}
        </section>

        <section className="newsletter">
          <h2 className="section-title">{h.nlTitle}</h2>
          <p className="dek">{h.nlBody}</p>
          <NewsletterForm lang={lang} />
        </section>
      </div>
    </div>
  );
}
