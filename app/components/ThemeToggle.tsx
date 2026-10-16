"use client";
import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const readTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export default function ThemeToggle({ className = "" }: { className?: string }) {
  // The <html data-theme> attribute is the single source of truth.
  const theme = useSyncExternalStore<Theme>(subscribeTheme, readTheme, () => "light");

  const apply = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* storage unavailable */ }
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> } };
    if (reduce || !doc.startViewTransition) return apply(next);

    // Circular reveal that grows out of the button.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.setAttribute("data-theme-switching", "");
    const t = doc.startViewTransition(() => {
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch { /* ignore */ }
    });
    t.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 900, easing: "cubic-bezier(.16,1,.3,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
    t.finished.finally(() => root.removeAttribute("data-theme-switching"));
  };

  return (
    <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className={`nav-icon-btn glass ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "grid" }}
        >
          {theme === "dark" ? <Sun size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
