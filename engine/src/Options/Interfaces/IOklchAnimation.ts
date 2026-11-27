import type { IColorAnimation } from "./IColorAnimation.js";

/** Animation settings for canonical OKLCH color channels. */
export interface IOklchAnimation {
  /** Chroma animation in OKLab units. */
  c: IColorAnimation;
  /** Hue animation in degrees. */
  h: IColorAnimation;
  /** Lightness animation in the 0–100 range. */
  l: IColorAnimation;
}
