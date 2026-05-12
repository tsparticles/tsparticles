import type { Particle } from "@tsparticles/engine";
import type { SpiralDirection } from "./SpiralDirection.js";

/**
 * Spiral path data for a particle
 */
export interface SpiralData {
  /** Current angle */
  angle: number;
  /** Angular speed */
  angularSpeed: number;
  /** Spiral direction */
  direction: SpiralDirection;
  /** Maximum radius */
  maxRadius: number;
  /** Radial speed */
  radialSpeed: number;
  /** Current radius */
  radius: number;
}

export interface SpiralParticle extends Particle {
  spiral?: SpiralData;
}
