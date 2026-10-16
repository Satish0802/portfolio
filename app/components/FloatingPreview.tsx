"use client";
import { useRef, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { useReducedMotion } from "../lib/useSafeReducedMotion";

/** Tracks the mouse inside a container and exposes springy x/y plus a velocity-driven tilt. */
export function useFloatingPreview(containerRef: RefObject<HTMLElement | null>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 27, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 27, mass: 0.5 });
  const vx = useVelocity(sx);
  const tilt = useTransform(vx, [-1600, 1600], [-13, 13], { clamp: true });
  const rotate = useSpring(tilt, { stiffness: 200, damping: 20 });
  const seeded = useRef(false);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !containerRef.current) return;
    const b = containerRef.current.getBoundingClientRect();
    const px = e.clientX - b.left, py = e.clientY - b.top;
    if (!seeded.current) { sx.jump(px); sy.jump(py); seeded.current = true; }
    x.set(px); y.set(py);
  };
  const reset = () => { seeded.current = false; };
  return { sx, sy, rotate, onMove, reset };
}

export function FloatingPreview({
  state, itemKey, children,
}: { state: ReturnType<typeof useFloatingPreview>; itemKey: string | null; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div aria-hidden="true" className="float-preview" style={{ x: state.sx, y: state.sy }}>
      <AnimatePresence mode="popLayout">
        {itemKey && (
          <motion.div
            key={itemKey}
            className="float-card-wrap"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            style={{ rotate: reduce ? 0 : state.rotate }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
