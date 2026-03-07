import type { IOptionsColor, RangeValue } from "@tsparticles/engine";

/**
 */
export interface ITwinkleParticlesValues {
  enable: boolean;
  fillColor?: string | IOptionsColor;
  frequency: number;
  opacity: RangeValue;
  strokeColor?: string | IOptionsColor;
}
