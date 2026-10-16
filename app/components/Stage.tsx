import type { CSSProperties } from "react";
import { publicAssetPath } from "../lib/site";

/** The cloud backdrop every sheet floats over. Purely decorative. */
export default function Stage() {
  return (
    <div
      className="stage"
      aria-hidden="true"
      style={{
        "--stage-image-light": `url("${publicAssetPath("/stage-light.webp")}")`,
        "--stage-image-dark": `url("${publicAssetPath("/stage-dark.webp")}")`,
      } as CSSProperties}
    >
      <div className="stage__drift" />
    </div>
  );
}
