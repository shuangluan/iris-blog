import type { Metadata } from "next";
import { getLang } from "@/lib/lang-server";
import { t, type Lang } from "@/lib/i18n";
import { PROJECTS, type Project } from "@/lib/projects";
import { getRelatedPosts } from "@/lib/posts";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description:
    "Projects by Iris Luan: ZEAI, Verbatim, OneLink at ByteDance / TikTok, and this site.",
  path: "/projects"
});

function statusLabel(status: Project["status"], lang: Lang) {
  const p = t(lang).projectsPage;
  if (status === "current") return p.current;
  if (status === "past") return p.past;
  return p.todoStatus;
}

export default function ProjectsPage() {
  const lang = getLang();
  const d = t(lang).projectsPage;

  return (
    <div className="measure page-stack">
      <header className="page-head">
        <h1 className="page-title">{d.title}</h1>
      </header>
      <div>
        {PROJECTS.map((project) => {
          const related = project.relatedNeedle
            ? getRelatedPosts(lang, project.relatedNeedle)
            : [];
          const external = project.url?.startsWith("http");
          const links: { href: string; label: string; external?: boolean }[] = [];
          if (project.url && project.urlLabel) {
            links.push({ href: project.url, label: project.urlLabel, external });
          }
          for (const post of related) {
            links.push({ href: `/posts/${post.slug}`, label: post.title });
          }
          return (
            <article key={project.id} className="project">
              <div className="project-top">
                <h2 className="project-name">
                  {project.url && !project.nameTodo ? (
                    <a
                      href={project.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                    >
                      {project.name[lang]}
                    </a>
                  ) : (
                    project.name[lang]
                  )}
                </h2>
                <span className="status">{statusLabel(project.status, lang)}</span>
              </div>
              {project.oneLine ? (
                <p className="one-line">{project.oneLine[lang]}</p>
              ) : project.oneLineTodo ? (
                <p className="one-line">{d.todoLine}</p>
              ) : null}
              {project.role || project.roleTodo ? (
                <p className="project-meta">
                  <span className="meta-label">{d.role}</span>
                  {" · "}
                  {project.role ? project.role[lang] : d.todoRole}
                </p>
              ) : null}
              {project.period ? (
                <p className="project-meta">
                  <span className="meta-label">{d.period}</span>
                  {" · "}
                  {project.period[lang]}
                </p>
              ) : null}
              {links.length ? (
                <p className="project-meta">
                  <span className="meta-label">{d.related}</span>
                  {" · "}
                  <span className="related-links">
                    {links.map((link, i) => (
                      <span key={link.href}>
                        {i > 0 ? " · " : null}
                        <a
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noreferrer" : undefined}
                        >
                          {link.label}
                        </a>
                      </span>
                    ))}
                  </span>
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
