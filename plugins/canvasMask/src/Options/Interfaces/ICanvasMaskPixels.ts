import type { IRgba } from "@tsparticles/engine";

/** The canvas mask pixels options */
export interface ICanvasMaskPixels {
  /** The pixels filter function or pattern; the second argument is the source pixel color space. */
  filter: string | ((pixel: IRgba, colorSpace?: "display-p3" | "srgb") => boolean);
  /** The pixels offset */
  offset: number;
}
