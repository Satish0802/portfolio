"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../lib/useSafeReducedMotion";
import { ArrowUp, Check, Copy, Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { scrollToTop } from "../lib/scroll";

const EMAIL = "satish020820@gmail.com";
const PHONE = "+977-9861282976";

function CopyPill({ value, icon }: { value: string; icon: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); } catch { return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button onClick={copy} className="pill pill--link" aria-label={`Copy ${value}`}>
      {icon}
      <span>{value}</span>
      <span className="relative grid h-4 w-4 place-items-center" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "c" : "n"}
            initial={{ opacity: 0, scale: 0.6, filter: "blur(3px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.6, filter: "blur(3px)" }}
            transition={{ duration: 0.2 }}
            style={{ display: "grid" }}
          >
            {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.75} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" role="status">{copied ? "Copied" : ""}</span>
    </button>
  );
}

/** Lives behind the page. As the last sheet lifts away it is revealed like a curtain. */
export default function Footer() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const [curtain, setCurtain] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const h = el.offsetHeight;
      const can = window.innerWidth >= 768 && h <= window.innerHeight;
      setCurtain(can);
      document.documentElement.style.setProperty("--footer-h", can ? `${h}px` : "0px");
    };
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    update();
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  const { scrollYProgress } = useScroll({ target: spacerRef, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "0%"]);
  const s = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const animateCurtain = curtain && !reduce;

  return (
    <>
      <div ref={spacerRef} className="footer-spacer" style={{ height: curtain ? "var(--footer-h)" : 0 }} aria-hidden="true" />
      <footer ref={ref} id="contact" className="site-footer sheet-a" data-curtain={curtain} aria-label="Contact">
        <motion.div className="footer-sheet" style={animateCurtain ? { y, scale: s, transformOrigin: "50% 100%" } : undefined}>
          <div className="wrap">
            <div className="footer-grid">
              <div>
                <Reveal>
                  <p className="pill mb-2"><span className="dot" aria-hidden="true" /> Available for junior &amp; internship roles</p>
                </Reveal>
                <h2 className="footer-title display mt-10 md:mt-14" aria-label="Let's build something">
                  <span className="block"><SplitText text="Let's build" delay={0.05} /></span>
                  <span className="block outline-text"><SplitText text="something." delay={0.25} /></span>
                </h2>
                <Reveal delay={0.1}>
                  <p className="muted mt-6 max-w-md">Have a role, project, or interesting problem? Send a note and I&apos;ll get back to you.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <CopyPill value={EMAIL} icon={<Mail size={14} strokeWidth={1.75} />} />
                    <CopyPill value={PHONE} icon={<Phone size={14} strokeWidth={1.75} />} />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a className="pill pill--link" href="https://github.com/Satish0802" target="_blank" rel="noopener noreferrer"><GithubIcon size={14} /> GitHub</a>
                    <a className="pill pill--link" href="https://www.linkedin.com/in/satish-shrestha-513582340/" target="_blank" rel="noopener noreferrer"><LinkedinIcon size={14} /> LinkedIn</a>
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.15}><ContactForm /></Reveal>
            </div>
            <div className="footer-bar">
              <span>© 2026 Satish Shrestha · Built with Next.js</span>
              <button onClick={scrollToTop} className="pill pill--link"><ArrowUp size={14} strokeWidth={1.9} /> Back to top</button>
            </div>
          </div>
        </motion.div>
      </footer>
    </>
  );
}
