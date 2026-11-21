import type { IParticleColorAnimation } from "./IParticleValueAnimation.js";

/** Per-particle animation state for OKLCH h/c/l channels. */
export interface IParticleOklchAnimation {
  /** Input color alpha, composed once with particle opacity at output. */
  a: number;
  /** Chroma channel animation in OKLab units. */
  c: IParticleColorAnimation;
  /** Hue channel animation in degrees. */
  h: IParticleColorAnimation;
  /** Lightness channel animation in the 0–100 range. */
  l: IParticleColorAnimation;
}
