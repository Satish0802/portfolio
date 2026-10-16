import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "../../lib/projects";
import ProjectGallery from "../../components/ProjectGallery";
import ProjectCover from "../../components/ProjectCover";
import SplitText from "../../components/SplitText";
import Reveal from "../../components/Reveal";
import Btn from "../../components/Btn";
import { GithubIcon } from "../../components/Icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.description } : {};
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  const project = projects[i];
  if (!project) notFound();
  const next = projects[(i + 1) % projects.length];

  return (
    <main id="main" tabIndex={-1} style={{ outline: "none" }}>
      <article className="detail sheet-a" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <div className="wrap" style={{ paddingTop: "6.5rem", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
          <Link href="/#work" transitionTypes={["nav-back"]} className="pill pill--link">
            <ArrowLeft size={14} strokeWidth={1.75} /> Back
          </Link>

          <header className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <ul className="mb-6 flex flex-wrap gap-2" aria-label="Tech stack">
                {project.stack.map((t) => <li key={t} className="pill">{t}</li>)}
              </ul>
              <h1 className="detail-title display" aria-label={project.name}>
                <SplitText text={project.name} by="word" stagger={0.12} duration={1.1} delay={0.15} />
              </h1>
              <p className="display outline-text mt-3" style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}>/{project.role}</p>
            </div>
            <Reveal delay={0.25}>
              <p className="muted max-w-md text-[1.0625rem] leading-relaxed">{project.fullDescription ?? project.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.liveUrl && <Btn href={project.liveUrl} external>Live preview</Btn>}
                <Btn href={project.githubUrl} external variant="ghost" icon={<GithubIcon size={16} />}>View code</Btn>
              </div>
            </Reveal>
          </header>

          <div className="mt-14">
            <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
              <div className="detail-cover"><ProjectCover project={project} priority /></div>
            </ViewTransition>
          </div>

          <Reveal className="mt-14">
            <dl className="meta-grid" style={{ maxWidth: "36rem" }}>
              <div><dt>Role</dt><dd>{project.role}</dd></div>
              <div><dt>Stack</dt><dd>{project.stack.join(", ")}</dd></div>
              {project.highlight && <div style={{ gridColumn: "1 / -1" }}><dt>Highlight</dt><dd>{project.highlight}</dd></div>}
            </dl>
          </Reveal>

          {project.features && (
            <section className="mt-24" aria-labelledby="shipped">
              <h2 id="shipped" className="section-title__label mb-8"><span className="slash">/</span>what shipped</h2>
              <ol className="stack-cards">
                {project.features.map((f, n) => (
                  <li key={f} className="stack-card" style={{ ["--i" as string]: n }}>
                    <b>{String(n + 1).padStart(2, "0")}</b>
                    <p>{f}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {project.images && project.images.length > 0 && (
            <section className="mt-24" aria-labelledby="shots">
              <h2 id="shots" className="section-title__label mb-8"><span className="slash">/</span>screenshots</h2>
              <ProjectGallery images={project.images} name={project.name} />
            </section>
          )}

          {project.snippet && (
            <section className="mt-24" aria-labelledby="code">
              <h2 id="code" className="section-title__label mb-8"><span className="slash">/</span>{project.snippet.label.toLowerCase()}</h2>
              <Reveal>
                <div className="code-window">
                  <div className="code-window__bar"><i /><i /><i /><span className="ml-2">{project.snippet.label}</span></div>
                  <pre><code>{project.snippet.code}</code></pre>
                </div>
              </Reveal>
            </section>
          )}

          {next && next.slug !== project.slug && (
            <div className="mt-28">
              <Link href={`/projects/${next.slug}`} transitionTypes={["nav-forward"]} className="next-link" data-cursor="Next">
                <span className="pill" style={{ background: "transparent" }}>Next project</span>
                <span className="next-link__title display mt-6 block">
                  {next.name.split(" ")[0]} <span className="outline-text">{next.name.split(" ").slice(1).join(" ")}</span>
                </span>
                <ArrowUpRight className="absolute right-8 top-8" size={34} strokeWidth={1.4} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
