"use client";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** reducedMotion="user" strips transform/layout animation for people who ask for it. */
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
