import type { IRgba } from "@tsparticles/engine";

/** The canvas mask pixels options */
export interface ICanvasMaskPixels {
  /** The pixels filter function or pattern */
  filter: string | ((pixel: IRgba) => boolean);
  /** The pixels offset */
  offset: number;
}
