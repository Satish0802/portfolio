"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function SectionHeader({
  index,
  title,
  ghost,
  note,
  dark,
}: {
  index: string;
  title: string;
  ghost?: string;
  note?: string;
  dark?: boolean;
}) {
  const reduce = useReducedMotion();
  const lineColor = dark ? "var(--ink-line)" : "var(--line)";
  const fgColor = dark ? "var(--ink-fg)" : "var(--foreground)";
  const mutedColor = dark ? "var(--ink-muted)" : "var(--muted)";
  return (
    <div className="relative mb-14 overflow-hidden pt-2">
      <motion.span
        aria-hidden
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="ghost-heading text-[clamp(3.5rem,11vw,9rem)]"
        style={{ WebkitTextStrokeColor: lineColor }}
      >
        {ghost ?? title}
      </motion.span>
      <div
        className="relative z-[1] flex items-end justify-between gap-4 border-b pb-4"
        style={{ borderColor: lineColor }}
      >
        <div className="flex items-end gap-4">
          <span className="font-mono text-[10px] text-accent">{index}</span>
          <h2 className="display-tight text-4xl font-semibold sm:text-6xl" style={{ color: fgColor }}>
            /{title}
          </h2>
        </div>
        {note && (
          <span className="eyebrow" style={{ color: mutedColor }}>
            {note}
          </span>
        )}
      </div>
    </div>
  );
}
