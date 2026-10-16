"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

/** A label bubble that follows the mouse over anything marked data-cursor="…". */
export default function CursorLabel() {
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor-label");
    let lx = -100, ly = -100, raf = 0;
    const update = () => {
      raf = 0;
      const el = document.elementFromPoint(lx, ly);
      const t = el?.closest?.("[data-cursor]");
      setLabel(t ? t.getAttribute("data-cursor") : null);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      lx = e.clientX; ly = e.clientY;
      x.set(lx); y.set(ly);
      schedule();
    };
    const onDown = () => setLabel(null);
    const onLeave = () => setLabel(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-cursor-label");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="cursor-label"
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      initial={{ opacity: 0 }}
      animate={{ opacity: label ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
