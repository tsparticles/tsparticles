import type { IOptionsColor, RangeValue } from "@tsparticles/engine";

/** The twinkle particles values options */
export interface ITwinkleParticlesValues {
  /** Enables the twinkle particles */
  enable: boolean;
  /** The twinkle particles fill color */
  fillColor?: string | IOptionsColor;
  /** The twinkle particles frequency */
  frequency: number;
  /** The twinkle particles opacity */
  opacity: RangeValue;
  /** The twinkle particles stroke color */
  strokeColor?: string | IOptionsColor;
}
