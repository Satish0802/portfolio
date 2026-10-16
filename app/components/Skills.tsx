"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { FloatingPreview, useFloatingPreview } from "./FloatingPreview";

const SKILLS = [
  { id: "frontend", title: "Frontend", blurb: "Interfaces in React and Next.js, typed with TypeScript and styled with Tailwind CSS.", items: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"] },
  { id: "backend", title: "Backend", blurb: "REST APIs on Node.js and Express, plus Django projects from my BCA. JWT for authentication.", items: ["Node.js", "Express.js", "Python", "Django", "REST APIs", "JWT"] },
  { id: "database", title: "Database", blurb: "Document and relational data, modelled in MongoDB with Mongoose, PostgreSQL and SQLite.", items: ["MongoDB", "Mongoose", "PostgreSQL", "SQLite"] },
  { id: "tools", title: "Tools", blurb: "Git and GitHub every day, ESLint to keep code consistent, dotenv for configuration.", items: ["Git", "GitHub", "ESLint", "dotenv"] },
];

export default function Skills() {
  const [open, setOpen] = useState<string | null>("frontend");
  const [hover, setHover] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const preview = useFloatingPreview(listRef);
  const hovered = SKILLS.find((s) => s.id === hover);

  return (
    <section id="stack" aria-label="Stack" className="sheet sheet-b">
      <div className="sheet__pad">
        <div className="wrap">
          <SectionTitle ghost="Stack" label="what I work with" note={`${SKILLS.reduce((n, s) => n + s.items.length, 0)} tools`} />

          <Reveal>
            <div
              ref={listRef}
              className="acc"
              onPointerMove={preview.onMove}
              onPointerLeave={() => { setHover(null); preview.reset(); }}
            >
              {SKILLS.map((s) => {
                const isOpen = open === s.id;
                return (
                  <div
                    key={s.id}
                    className="acc__row"
                    data-open={isOpen}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setHover(s.id)}
                  >
                    <h3>
                      <button
                        className="acc__head"
                        aria-expanded={isOpen}
                        aria-controls={`panel-${s.id}`}
                        id={`head-${s.id}`}
                        onClick={() => setOpen(isOpen ? null : s.id)}
                      >
                        <span className="acc__title">{s.title}</span>
                        <span className="acc__count" aria-hidden="true">({s.items.length})</span>
                        <span className="acc__icon" aria-hidden="true">
                          <ArrowUpRight className="i-arrow" size={20} strokeWidth={1.6} />
                          <X className="i-x" size={20} strokeWidth={1.6} />
                        </span>
                      </button>
                    </h3>
                    <div className="acc__panel" id={`panel-${s.id}`} role="region" aria-labelledby={`head-${s.id}`} inert={!isOpen}>
                      <div>
                        <div className="acc__body">
                          <p>{s.blurb}</p>
                          <ul className="chips">
                            {s.items.map((i) => <li key={i} className="chip">{i}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <FloatingPreview state={preview} itemKey={hovered ? hovered.id : null}>
                {hovered && (
                  <div className="float-card">
                    <div className="float-card__inner">
                      <p className="float-card__kicker">{hovered.title}</p>
                      <ul className="float-card__list">
                        {hovered.items.slice(0, 4).map((i) => <li key={i}>{i}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </FloatingPreview>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
