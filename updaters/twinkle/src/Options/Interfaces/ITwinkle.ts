import type { ITwinkleLinksValues } from "./ITwinkleLinksValues.js";
import type { ITwinkleParticlesValues } from "./ITwinkleParticlesValues.js";

/**
 * [[include:Options/Particles/Twinkle.md]]
 */
export interface ITwinkle {
  links: ITwinkleLinksValues;
  particles: ITwinkleParticlesValues;
}
