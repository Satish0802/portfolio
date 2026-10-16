"use client";
import { useRef, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "../lib/useSafeReducedMotion";

/** Nudges its child toward the pointer. Transform-only, mouse-only. */
export default function Magnetic({ children, strength = 0.32, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 320, damping: 20, mass: 0.4 });
  const y = useSpring(0, { stiffness: 320, damping: 20, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={reduce ? undefined : { x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const b = ref.current.getBoundingClientRect();
        x.set((e.clientX - (b.left + b.width / 2)) * strength);
        y.set((e.clientY - (b.top + b.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
