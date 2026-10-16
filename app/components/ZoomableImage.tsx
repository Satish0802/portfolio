"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

export default function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [zoom, setZoom] = useState(1);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 1));

  return (
    <div className="relative h-full w-full">
      <div className="absolute right-3 top-3 z-10 flex gap-1 rounded-full bg-black/70 p-1 backdrop-blur">
        <button onClick={zoomOut} aria-label="Zoom out" className="grid h-8 w-8 place-items-center rounded-full text-white hover:bg-white/15">
          <ZoomOut size={16} strokeWidth={1.75} />
        </button>
        <button onClick={zoomIn} aria-label="Zoom in" className="grid h-8 w-8 place-items-center rounded-full text-white hover:bg-white/15">
          <ZoomIn size={16} strokeWidth={1.75} />
        </button>
      </div>

      <div className="h-full w-full overflow-auto" data-lenis-prevent>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
          className="w-full transition-transform duration-200"
        />
      </div>
    </div>
  );
}
