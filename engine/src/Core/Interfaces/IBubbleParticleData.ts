import type { IHsl } from "./Colors.js";

/**
 */
export interface IBubbleParticleData {
  color?: IHsl;
  div?: HTMLElement;
  finalColor?: IHsl;
  inRange: boolean;
  opacity?: number;
  radius?: number;
}
