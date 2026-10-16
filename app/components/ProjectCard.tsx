"use client";
import { useRef, ViewTransition } from "react";
import Link from "next/link";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "../lib/useSafeReducedMotion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import ProjectCover from "./ProjectCover";
import { EXPO } from "../lib/scroll";
import type { Project } from "../lib/projects";

export default function ProjectCard({ project, index, className = "" }: { project: Project; index: number; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const rx = useSpring(0, { stiffness: 190, damping: 22 });
  const ry = useSpring(0, { stiffness: 190, damping: 22 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const b = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - b.left) / b.width - 0.5) * 6);
    rx.set(-((e.clientY - b.top) / b.height - 0.5) * 6);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.article
      ref={ref}
      className={`pcard ${className}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, delay: (index % 2) * 0.12, ease: EXPO }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div className="pcard__shell" style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}>
        <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
          <div className="pcard__core">
            <ProjectCover project={project} priority={index === 0} />
            <span className="pcard__badge pill" style={{ background: "rgba(255,255,255,.92)", color: "#0c0c0e", boxShadow: "none" }}>{project.role}</span>
            <span className="pcard__arrow" aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.75} /></span>
          </div>
        </ViewTransition>
      </motion.div>

      <div className="pcard__meta">
        <h3 className="pcard__title">
          <Link href={`/projects/${project.slug}`} transitionTypes={["nav-forward"]}>{project.name}</Link>
        </h3>
        {project.highlight && <span className="pill">{project.highlight}</span>}
      </div>
      <p className="pcard__desc">{project.description}</p>
      <ul className="pcard__tags" aria-label="Tech stack">
        {project.stack.map((t) => <li key={t} className="pill">{t}</li>)}
      </ul>
      <div className="pcard__links">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="pill pill--link"><GithubIcon size={14} /> Code</a>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pill pill--link"><ExternalLink size={14} strokeWidth={1.75} /> Live</a>
        )}
      </div>
    </motion.article>
  );
}
