import type { ILifeDelay } from "./ILifeDelay.js";
import type { ILifeDuration } from "./ILifeDuration.js";

/** The life options */
export interface ILife {
  /** The life count */
  count: number;
  /** The life delay options */
  delay: ILifeDelay;
  /** The life duration options */
  duration: ILifeDuration;
}
