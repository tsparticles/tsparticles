import type { IHsl } from "./Colors.js";

/** Bubble effect data for a particle */
export interface IBubbleParticleData {
  /** Bubble color */
  color?: IHsl;
  /** Optional div element for hover bubbles */
  div?: HTMLElement;
  /** Final calculated bubble color */
  finalColor?: IHsl;
  /** Whether the particle is within bubble range */
  inRange: boolean;
  /** Bubble opacity */
  opacity?: number;
  /** Bubble radius */
  radius?: number;
}
