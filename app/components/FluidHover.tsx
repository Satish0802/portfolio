"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

/**
 * Wraps a cover in a grayscale state that unlocks into colour on hover, plus
 * a small circle that follows the cursor and pops in with a spring ease.
 * Pass `lensSrc` (the cover's own image path) to turn that circle into a
 * magnifying lens showing a zoomed peek of whatever's underneath it; omit it
 * for covers with no underlying photo (illustrated covers get a plain label
 * pill instead — there's nothing to zoom into).
 */
export default function FluidHover({
  children,
  className = "",
  lensSrc,
  label = "View",
  zoom = 2.2,
  lensSize = 104,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  lensSrc?: string;
  label?: string;
  zoom?: number;
  lensSize?: number;
} & HTMLAttributes<HTMLDivElement>) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const lens = lensRef.current;
    if (!el) return;

    const sizeLens = () => {
      if (!lensSrc || !lens) return;
      const b = el.getBoundingClientRect();
      lens.style.backgroundImage = `url(${lensSrc})`;
      lens.style.backgroundSize = `${b.width * zoom}px ${b.height * zoom}px`;
    };
    const onEnter = () => { el.dataset.hover = "1"; sizeLens(); };
    const onLeave = () => { el.dataset.hover = "0"; };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const b = el.getBoundingClientRect();
      if (b.width === 0 || b.height === 0) return;
      const cx = e.clientX - b.left;
      const cy = e.clientY - b.top;
      el.style.setProperty("--x", `${cx}px`);
      el.style.setProperty("--y", `${cy}px`);
      if (lensSrc && lens) {
        lens.style.backgroundPosition = `${-(cx * zoom - lensSize / 2)}px ${-(cy * zoom - lensSize / 2)}px`;
      }
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);
    window.addEventListener("resize", sizeLens);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
      window.removeEventListener("resize", sizeLens);
    };
  }, [lensSrc, zoom, lensSize]);

  return (
    <div
      ref={wrapRef}
      className={`fluid-hover fluid-hover--interactive ${className}`}
      data-hover="0"
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
      {...rest}
    >
      <div className="fluid-hover__media">{children}</div>
      <div
        ref={lensRef}
        className={`fluid-hover__lens ${lensSrc ? "fluid-hover__lens--photo" : "fluid-hover__lens--plain"}`}
        style={{ width: lensSize, height: lensSize }}
        aria-hidden="true"
      >
        <span className="fluid-hover__lens-label">{label}</span>
      </div>
    </div>
  );
}
