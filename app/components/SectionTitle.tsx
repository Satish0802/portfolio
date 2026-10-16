"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../lib/useSafeReducedMotion";
import SplitText from "./SplitText";

/** "/label" heading with a giant ghost word that drifts sideways as you scroll. */
export default function SectionTitle({
  ghost, label, note, action,
}: { ghost: string; label: string; note?: string; action?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-7%", "9%"]);

  return (
    <div ref={ref} className="section-title">
      <motion.span aria-hidden="true" className="ghost" style={reduce ? undefined : { x }}>
        {ghost}
      </motion.span>
      <div className="section-title__row">
        <h2 className="section-title__label">
          <span className="slash">/</span>
          <SplitText text={label} by="word" stagger={0.09} duration={0.9} />
        </h2>
        <div className="flex items-center gap-4">
          {note && <span className="muted text-sm font-semibold">{note}</span>}
          {action}
        </div>
      </div>
    </div>
  );
}
