"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../lib/useSafeReducedMotion";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import Btn from "./Btn";
import Modal from "./Modal";
import ZoomableImage from "./ZoomableImage";
import { FloatingPreview, useFloatingPreview } from "./FloatingPreview";
import { goToSection } from "../lib/scroll";
import { publicAssetPath } from "../lib/site";

type Milestone = {
  id: string;
  title: string;
  place: string;
  date: string;
  href?: string;
  previewUrl?: string;
  fileUrl?: string;
};

const MILESTONES: Milestone[] = [
  {
    id: "mern",
    title: "Full Stack Web Development (MERN Stack)",
    place: "Broadway Infosys",
    date: "Feb – Jun 2026",
    previewUrl: publicAssetPath("/certificates/mern-broadway-infosys.png"),
    fileUrl: publicAssetPath("/certificates/mern-broadway-infosys.pdf"),
  },
  {
    id: "bca",
    title: "Bachelor of Computer Application",
    place: "Lumbini Academic College",
    date: "2020 – 2026",
    href: "https://laf.edu.np/",
  },
  {
    id: "github",
    title: "GitHub Workshop",
    place: "Lumbini Academic College",
    date: "Certificate",
    previewUrl: publicAssetPath("/certificates/github-workshop.png"),
    fileUrl: publicAssetPath("/certificates/github-workshop.pdf"),
  },
];

/** Each row lights up as it travels up the screen. */
function Row({
  m, onOpen, onHover,
}: { m: Milestone; onOpen: (m: Milestone) => void; onHover: (id: string | null) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 96%", "start 62%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [26, 0]);

  const body = (
    <>
      <span>
        <span className="jrow__title block">{m.title}</span>
        <span className="jrow__place block">{m.place}</span>
      </span>
      <span className="jrow__date">
        {m.date}
        <span className="jrow__cta">
          {m.previewUrl ? "View certificate" : "Visit site"} <ArrowUpRight size={14} strokeWidth={1.9} />
        </span>
      </span>
    </>
  );

  return (
    <motion.li ref={ref} style={reduce ? undefined : { opacity, y }} onPointerEnter={(e) => e.pointerType === "mouse" && onHover(m.id)}>
      {m.href ? (
        <a href={m.href} target="_blank" rel="noopener noreferrer" className="jrow">{body}</a>
      ) : (
        <button type="button" className="jrow" onClick={() => onOpen(m)} aria-label={`View certificate: ${m.title}`}>{body}</button>
      )}
    </motion.li>
  );
}

export default function Journey() {
  const [open, setOpen] = useState<Milestone | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const preview = useFloatingPreview(listRef);
  const hovered = MILESTONES.find((m) => m.id === hover);

  return (
    <section id="journey" aria-label="Education and certifications" className="sheet sheet-i sheet--tail">
      <div className="sheet__pad">
        <div className="wrap">
          <SectionTitle ghost="Journey" label="education & training" note="BCA · 2020 – 2026" />

          <ul
            ref={listRef}
            className="relative"
            style={{ borderTop: "1px solid var(--line)" }}
            onPointerMove={preview.onMove}
            onPointerLeave={() => { setHover(null); preview.reset(); }}
          >
            {MILESTONES.map((m) => <Row key={m.id} m={m} onOpen={setOpen} onHover={setHover} />)}

            <FloatingPreview state={preview} itemKey={hovered?.previewUrl ? hovered.id : null}>
              {hovered?.previewUrl && (
                <div className="float-card float-card--img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={hovered.previewUrl} alt="" />
                </div>
              )}
            </FloatingPreview>
          </ul>

          <Reveal className="mt-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <p className="display max-w-[15ch]" style={{ fontSize: "clamp(2.2rem, 5.6vw, 5rem)", lineHeight: 0.92 }}>
              Now looking for <span className="outline-text">junior</span> roles.
            </p>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <p className="muted max-w-xs text-[.9375rem] md:text-right">Open to internships and junior developer opportunities.</p>
              <Btn onClick={() => goToSection("contact")}>Get in touch</Btn>
            </div>
          </Reveal>
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title} downloadUrl={open?.fileUrl}>
        {open?.previewUrl && <ZoomableImage src={open.previewUrl} alt={open.title} />}
      </Modal>
    </section>
  );
}
