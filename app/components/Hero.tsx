"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue, type Variants } from "framer-motion";
import { useReducedMotion } from "../lib/useSafeReducedMotion";
import { ArrowDownRight, FileText, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import SplitText from "./SplitText";
import Btn from "./Btn";
import Magnetic from "./Magnetic";
import { EXPO, goToSection } from "../lib/scroll";
import { publicAssetPath } from "../lib/site";

type Mode = "idle" | "full" | "quick";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Satish0802", icon: <GithubIcon size={16} />, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/satish-shrestha-513582340/", icon: <LinkedinIcon size={16} />, external: true },
  { label: "Email", href: "mailto:satish020820@gmail.com", icon: <Mail size={16} strokeWidth={1.75} /> },
  { label: "Resume", href: publicAssetPath("/resume.pdf"), icon: <FileText size={16} strokeWidth={1.75} />, external: true },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("idle");
  const [covered, setCovered] = useState(false);
  const coveredRef = useRef(false);
  const [time, setTime] = useState("");

  // Full intro once per session; a quick fade afterwards.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch { /* storage unavailable */ }
    const id = requestAnimationFrame(() => setMode(seen ? "quick" : "full"));
    return () => cancelAnimationFrame(id);
  }, []);

  // Kathmandu clock.
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kathmandu", hour: "2-digit", minute: "2-digit" });
    const first = setTimeout(() => setTime(fmt()), 0);
    const id = setInterval(() => setTime(fmt()), 20_000);
    return () => { clearTimeout(first); clearInterval(id); };
  }, []);

  // The hero is pinned behind the sheets; once they fully cover it we stop painting it.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const c = y > window.innerHeight * 1.08;
    if (c !== coveredRef.current) { coveredRef.current = c; setCovered(c); }
  });
  const scale = useTransform(scrollY, [0, 800], [1, 0.925]);
  const dim = useTransform(scrollY, [0, 800], [0, 0.5]);
  const line1X = useTransform(scrollY, [0, 800], [0, -110]);
  const line2X = useTransform(scrollY, [0, 800], [0, 110]);
  const portraitY = useTransform(scrollY, [0, 800], [0, -70]);

  const play = mode !== "idle";
  const q = mode === "quick";
  const t = (n: number) => (q ? n * 0.3 : n);

  const fadeUp: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 26, filter: "blur(6px)" },
    show: (d: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: q ? 0.5 : 1, delay: t(d), ease: EXPO } }),
  };
  const slideIn: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 30 },
    show: (d: number) => ({ opacity: 1, x: 0, transition: { duration: q ? 0.5 : 0.9, delay: t(d), ease: EXPO } }),
  };

  return (
    <>
      <div className="hero-spacer" aria-hidden="true" />
      <div className="hero-layer" data-covered={covered}>
        <motion.section
          id="top"
          aria-label="Introduction"
          className="hero-sheet"
          style={reduce ? undefined : { scale, transformOrigin: "50% 0%" }}
          initial="hidden"
          animate={play ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 24 },
            show: { opacity: 1, y: 0, transition: { duration: q ? 0.4 : 1, ease: EXPO } },
          }}
        >
          {/* scroll dimmer as the next sheet slides over */}
          {!reduce && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] bg-black" style={{ opacity: dim }} />}

          <motion.p variants={slideIn} custom={0.9} className="hero-meta-top" aria-label="Location and local time">
            <MapPin size={13} strokeWidth={1.75} />
            <span>Kathmandu, Nepal</span>
            <span className="muted">{time ? `${time} NPT` : ""}</span>
          </motion.p>

          <h1 className="hero-name display" aria-label="Satish Shrestha">
            <motion.span className="hero-name__line hero-name__line--1 outline-text" style={reduce ? undefined : { x: line1X }}>
              <SplitText text="SATISH" play={play} delay={t(0.25)} stagger={q ? 0.02 : 0.055} duration={q ? 0.6 : 1.1} />
            </motion.span>
            <motion.span className="hero-name__line hero-name__line--2 blend" style={reduce ? undefined : { x: line2X }}>
              <SplitText text="SHRESTHA" play={play} delay={t(0.5)} stagger={q ? 0.02 : 0.05} duration={q ? 0.6 : 1.1} />
            </motion.span>
          </h1>

          <div aria-hidden="true" />

          <Portrait play={play} quick={q} auto={mode === "full"} y={reduce ? undefined : portraitY} />

          <div className="hero-foot">
            <div className="hero-copy">
              <motion.p variants={fadeUp} custom={1.0} className="hero-role">Full-stack developer</motion.p>
              <motion.p variants={fadeUp} custom={1.1} className="hero-desc">
                I build useful software where interfaces, APIs and data meet — from real-time chat to security-conscious dashboards.
              </motion.p>
              <motion.div variants={fadeUp} custom={1.22} className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Btn onClick={() => goToSection("work")} icon={<ArrowDownRight size={17} strokeWidth={1.75} />}>Explore work</Btn>
                </Magnetic>
              </motion.div>
            </div>

            <ul className="hero-socials" aria-label="Links">
              {SOCIALS.map((s, i) => (
                <motion.li key={s.label} variants={slideIn} custom={1.05 + i * 0.09}>
                  <a
                    href={s.href}
                    className="pill pill--link glass-flat"
                    {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>
    </>
  );
}

/** Arch portrait: greyscale by default; a colour spotlight follows the cursor. */
function Portrait({ play, quick, auto, y }: { play: boolean; quick: boolean; auto: boolean; y?: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(140);
  const my = useMotionValue(280);
  const sx = useSpring(mx, { stiffness: 240, damping: 30, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 240, damping: 30, mass: 0.6 });
  const r = useSpring(0.01, { stiffness: 160, damping: 22 });
  const rx = useSpring(0, { stiffness: 140, damping: 20 });
  const ry = useSpring(0, { stiffness: 140, damping: 20 });
  const mask = useMotionTemplate`radial-gradient(circle ${r}px at ${sx}px ${sy}px, #000 0%, #000 52%, transparent 100%)`;

  // One gentle sweep after the intro so people discover the spotlight.
  useEffect(() => {
    if (!auto || reduce || !window.matchMedia("(hover: hover)").matches) return;
    const el = ref.current;
    if (!el) return;
    const w = el.offsetWidth, h = el.offsetHeight;
    const id = setTimeout(() => {
      my.set(h * 0.6);
      mx.set(w * 0.22);
      r.set(w * 0.42);
      const c = animate(mx, w * 0.78, { duration: 1.5, ease: [0.65, 0, 0.35, 1] });
      c.then(() => r.set(0.01));
    }, 2400);
    return () => clearTimeout(id);
  }, [auto, reduce, mx, my, r]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const b = ref.current.getBoundingClientRect();
    const px = e.clientX - b.left, py = e.clientY - b.top;
    mx.set(px); my.set(py);
    r.set(b.width * 0.36);
    if (!reduce) {
      rx.set(-((py / b.height) - 0.5) * 7);
      ry.set(((px / b.width) - 0.5) * 9);
    }
  };
  const onLeave = () => { r.set(0.01); rx.set(0); ry.set(0); };

  return (
    <motion.div
      className="portrait-wrap"
      style={{ y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: play ? 1 : 0 }}
      transition={{ duration: 0.01 }}
    >
      <motion.div
        ref={ref}
        className="portrait"
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        initial={{ y: "42%" }}
        animate={{ y: play ? "0%" : "42%" }}
        transition={{ duration: quick ? 0.6 : 1.5, delay: quick ? 0.1 : 0.55, ease: EXPO }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        role="img"
        aria-label="Portrait of Satish Shrestha in front of snow-capped mountains"
      >
        <motion.div
          className="portrait__img portrait__base"
          initial={{ scale: 1.2, filter: "blur(18px)" }}
          animate={play ? { scale: 1, filter: "blur(0px)" } : { scale: 1.2, filter: "blur(18px)" }}
          transition={{ duration: quick ? 0.7 : 1.8, delay: quick ? 0.1 : 0.55, ease: EXPO }}
        >
          <Image src={publicAssetPath("/profile.jpg")} alt="" fill priority sizes="(min-width: 768px) 27vw, 64vw" />
        </motion.div>
        <motion.div className="portrait__color" style={{ maskImage: mask, WebkitMaskImage: mask }} aria-hidden="true">
          <div className="portrait__img">
            <Image src={publicAssetPath("/profile.jpg")} alt="" fill priority sizes="(min-width: 768px) 27vw, 64vw" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
