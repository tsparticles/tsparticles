import type { IWobbleSpeed } from "./IWobbleSpeed.js";
import type { RangeValue } from "@tsparticles/engine";

/** The wobble options */
export interface IWobble {
  /** The wobble distance */
  distance: RangeValue;
  /** Enables the wobble */
  enable: boolean;
  /** The wobble speed */
  speed: RangeValue | IWobbleSpeed;
}
