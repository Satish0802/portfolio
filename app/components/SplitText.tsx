"use client";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "../lib/useSafeReducedMotion";
import { EXPO } from "../lib/scroll";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** When provided the reveal is controlled (hero intro). Otherwise it plays when scrolled into view. */
  play?: boolean;
  by?: "char" | "word";
};

/** Masked, staggered text reveal – each unit rises out of an invisible line box. */
export default function SplitText({ text, className = "", delay = 0, stagger = 0.045, duration = 1, play, by = "char" }: Props) {
  const reduce = useReducedMotion();
  const units = by === "char" ? [...text] : text.split(" ");
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: "108%" },
    show: (i: number) => ({
      y: 0, opacity: 1,
      transition: { duration: reduce ? 0.3 : duration, delay: delay + i * stagger, ease: EXPO },
    }),
  };
  const controlled = play !== undefined;
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      {...(controlled
        ? { animate: play ? "show" : "hidden" }
        : { whileInView: "show", viewport: { once: true, amount: 0.6 } })}
    >
      {units.map((u, i) => (
        <span key={i} aria-hidden="true" className={by === "char" ? "mask-char" : "mask-word"}>
          <motion.span className="char" variants={variants} custom={i}>
            {u === " " ? "\u00A0" : u}
            {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
