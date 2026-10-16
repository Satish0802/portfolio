"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Check } from "lucide-react";
import { getLenis } from "../lib/scroll";

export default function Modal({
  open,
  onClose,
  title,
  downloadUrl,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  downloadUrl?: string;
  children: React.ReactNode;
}) {
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [downloaded, setDownloaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 1800);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-back"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Opacity + clip-path only – no transform on this box. A lingering `transform` (which Framer Motion keeps even at rest) can stop some browsers' native PDF viewer from painting inside it. */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title ?? "Preview"}
            className="modal-panel"
            initial={{ opacity: 0, clipPath: "inset(14% 10% 14% 10% round 28px)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
            exit={{ opacity: 0, clipPath: "inset(6% 6% 6% 6% round 28px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-bar">
              <h2>{title}</h2>
              <div className="flex items-center gap-2">
                {downloadUrl && (
                  <button onClick={handleDownload} className="pill pill--link">
                    {downloaded ? <Check size={14} /> : <Download size={14} />}
                    {downloaded ? "Downloading" : "Download"}
                  </button>
                )}
                <button ref={closeRef} onClick={onClose} aria-label="Close" className="nav-icon-btn pill" style={{ padding: 0 }}>
                  <X size={17} strokeWidth={1.75} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-white" data-lenis-prevent>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
