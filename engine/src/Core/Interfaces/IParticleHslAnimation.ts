import type { IParticleColorAnimation } from "./IParticleValueAnimation.js";

/** Particle HSL animation data for all three color channels */
export interface IParticleHslAnimation {
  /** Hue channel animation */
  h: IParticleColorAnimation;
  /** Lightness channel animation */
  l: IParticleColorAnimation;
  /** Saturation channel animation */
  s: IParticleColorAnimation;
}
