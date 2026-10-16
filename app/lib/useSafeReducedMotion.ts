"use client";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getSnapshot = () => window.matchMedia(QUERY).matches;
// Always false on the server (and on the client's very first hydration pass),
// so markup never depends on a preference the server couldn't have known.
const getServerSnapshot = () => false;

/**
 * A hydration-safe replacement for framer-motion's `useReducedMotion`.
 *
 * Framer's own hook reads `matchMedia` synchronously during the first client
 * render, which can differ from the server-rendered markup for any visitor
 * who actually has the OS-level "reduce motion" preference on — a genuine
 * hydration mismatch, not just a testing artifact. `useSyncExternalStore`'s
 * server-snapshot argument is built for exactly this: it guarantees the
 * hydration render matches the server, then syncs to the real value right after.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
