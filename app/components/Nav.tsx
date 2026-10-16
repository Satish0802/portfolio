"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Modal from "./Modal";
import ZoomableImage from "./ZoomableImage";
import { publicAssetPath } from "../lib/site";
import { getLenis, goToSection } from "../lib/scroll";

const LINKS = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Stack", id: "stack" },
  { label: "Journey", id: "journey" },
];
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Nav() {
  const pathname = usePathname();
  const [activeRaw, setActive] = useState("");
  const [menu, setMenu] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const active = pathname === "/" ? activeRaw : "";

  // Highlight the section that sits in the middle band of the viewport (home only).
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  // Lock scroll under the mobile menu.
  useEffect(() => {
    if (!menu) return;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const onLink = (id: string) => (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      setMenu(false);
      // wait a beat so the menu scroll-lock releases before Lenis scrolls
      setTimeout(() => goToSection(id), menu ? 350 : 0);
    } else {
      setMenu(false);
    }
  };

  return (
    <>
      <motion.header
        className="site-nav"
        initial={{ opacity: 0, y: -22, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
      >
        <Link href="/" className="nav-brand glass" onClick={() => setMenu(false)} aria-label="Satish Shrestha – home">
          <span className="dot" aria-hidden="true" />
          <span>Satish Shrestha</span>
          <small className="hidden sm:inline">· open to work</small>
        </Link>

        <nav aria-label="Primary" className="nav-links glass">
          {LINKS.map((l) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              onClick={onLink(l.id)}
              className="nav-link"
              data-active={active === l.id}
              aria-current={active === l.id ? "true" : undefined}
            >
              {active === l.id && (
                <motion.span layoutId="nav-active" className="nav-link__pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <div className="hidden items-center gap-2 min-[900px]:flex">
            <button onClick={() => setResumeOpen(true)} className="glass nav-brand" style={{ padding: ".7rem 1.05rem" }}>
              <FileText size={15} strokeWidth={1.75} /> Resume
            </button>
            <ThemeToggle />
            <button onClick={() => goToSection("contact")} className="btn btn--solid btn--sm" style={{ ["--fg" as string]: "var(--nav-fg)", ["--bg" as string]: "var(--a-bg)", ["--accent" as string]: "var(--acc-a)", ["--on-accent" as string]: "var(--on-acc-a)" }}>
              <span>Let&apos;s talk</span>
              <span className="btn__icon"><ArrowUpRight size={15} strokeWidth={1.75} /></span>
            </button>
          </div>
          <button
            className="menu-btn glass min-[900px]:hidden"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            <span /><span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <span key={l.id} className="mask-word" style={{ display: "block" }}>
                  <motion.span
                    style={{ display: "block" }}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, delay: 0.08 + i * 0.07, ease: EASE }}
                  >
                    <Link href={`/#${l.id}`} onClick={onLink(l.id)} className="display" style={{ fontSize: "clamp(2.8rem, 13vw, 5rem)" }}>
                      {l.label}
                    </Link>
                  </motion.span>
                </span>
              ))}
            </nav>
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            >
              <button onClick={() => { setMenu(false); setResumeOpen(true); }} className="pill pill--link"><FileText size={15} strokeWidth={1.75} /> Resume</button>
              <button onClick={() => { setMenu(false); setTimeout(() => goToSection("contact"), 350); }} className="pill pill--link">Let&apos;s talk <ArrowUpRight size={15} strokeWidth={1.75} /></button>
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal open={resumeOpen} onClose={() => setResumeOpen(false)} title="Resume / 2026" downloadUrl={publicAssetPath("/resume.pdf")}>
        <ZoomableImage src={publicAssetPath("/resume.png")} alt="Resume" />
      </Modal>
    </>
  );
}
