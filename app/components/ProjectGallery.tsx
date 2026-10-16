"use client";
import { useState } from "react";
import Modal from "./Modal";
import ZoomableImage from "./ZoomableImage";
import Reveal from "./Reveal";

export default function ProjectGallery({ images, name }: { images: string[]; name: string }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!images || images.length === 0) return null;
  return (
    <>
      <div className="gallery">
        {images.map((src, i) => (
          <Reveal key={src} delay={(i % 2) * 0.1}>
            <button onClick={() => setOpen(src)} className="gallery__item w-full" data-cursor="Zoom" aria-label={`Open ${name} screenshot ${i + 1}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${name} screenshot ${i + 1}`} loading="lazy" />
            </button>
          </Reveal>
        ))}
      </div>
      <Modal open={!!open} onClose={() => setOpen(null)} title={name}>
        {open && <ZoomableImage src={open} alt={name} />}
      </Modal>
    </>
  );
}
