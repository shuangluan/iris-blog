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
          const shown = related.slice(0, 3);
          const external = project.url?.startsWith("http");
          const hasRelated = Boolean(project.url && project.urlLabel) || related.length > 0;
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
              <div className="meta-rows">
                {project.role || project.roleTodo ? (
                  <div className="meta-row">
                    <span className="meta-label">{d.role}</span>
                    <span className="meta-value">
                      {project.role ? project.role[lang] : d.todoRole}
                    </span>
                  </div>
                ) : null}
                {project.period ? (
                  <div className="meta-row">
                    <span className="meta-label">{d.period}</span>
                    <span className="meta-value">{project.period[lang]}</span>
                  </div>
                ) : null}
                {hasRelated ? (
                  <div className="meta-row">
                    <span className="meta-label">{d.related}</span>
                    <ul className="related-list">
                      {project.url && project.urlLabel ? (
                        <li>
                          <a
                            href={project.url}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                          >
                            {project.urlLabel}
                          </a>
                        </li>
                      ) : null}
                      {shown.map((post) => (
                        <li key={post.slug}>
                          <a href={`/posts/${post.slug}`}>{post.title}</a>
                        </li>
                      ))}
                      {related.length > 3 && project.relatedNeedle ? (
                        <li>
                          <a href={`/writing?tag=${encodeURIComponent(project.relatedNeedle)}`}>
                            {d.allPosts(related.length)}
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
