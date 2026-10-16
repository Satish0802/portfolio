"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "../lib/useSafeReducedMotion";
import type { ReactNode } from "react";
import { EXPO } from "../lib/scroll";

/** Fade-up entrance. Blur is opt-in and only meant for small elements. */
export default function Reveal({
  children, delay = 0, y = 34, blur = false, className, amount = 0.2,
}: { children: ReactNode; delay?: number; y?: number; blur?: boolean; className?: string; amount?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, ...(blur ? { filter: "blur(8px)" } : {}) }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, amount, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.95, delay, ease: EXPO }}
    >
      {children}
    </motion.div>
  );
}
