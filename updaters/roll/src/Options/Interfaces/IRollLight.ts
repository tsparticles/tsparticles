import type { RangeValue } from "@tsparticles/engine";

/** The roll light options */
export interface IRollLight {
  /** Enables the roll light */
  enable: boolean;
  /** The roll light value */
  value: RangeValue;
}
