import type { RangeValue } from "@tsparticles/engine";

/** The rotate animation options */
export interface IRotateAnimation {
  /** The rotate animation decay */
  decay: RangeValue;
  /** Enables the rotate animation */
  enable: boolean;
  /** The rotate animation speed */
  speed: RangeValue;
  /** Enables the rotate animation sync */
  sync: boolean;
}
