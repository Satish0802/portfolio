import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Scroll to a section id. "contact" always means "the very bottom" because
 *  the footer is a curtain that lives behind the page content. */
export function goToSection(id: string) {
  const lenis = getLenis();
  if (id === "contact") {
    const y = document.documentElement.scrollHeight - window.innerHeight;
    if (lenis) lenis.scrollTo(y, { duration: 1.6 });
    else window.scrollTo({ top: y, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -8, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const SPRING_SOFT = { type: "spring", stiffness: 260, damping: 26, mass: 0.5 } as const;
