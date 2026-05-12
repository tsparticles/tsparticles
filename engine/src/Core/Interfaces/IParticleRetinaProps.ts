import type { IDistance } from "./IDistance.js";

/** Particle retina-scaled property values */
export interface IParticleRetinaProps {
  /** Maximum distance for retina displays */
  maxDistance: Partial<IDistance>;
  /** Maximum speed adjusted for retina */
  maxSpeed: number;
  /** Movement drift adjusted for retina */
  moveDrift: number;
  /** Movement speed adjusted for retina */
  moveSpeed: number;
  /** Size animation speed adjusted for retina */
  sizeAnimationSpeed: number;
}
