import type { ILifeDelay } from "./ILifeDelay.js";
import type { ILifeDuration } from "./ILifeDuration.js";

/**
 * The life options
 * [[include:Options/Particles/Life.md]]
 */
export interface ILife {
  /** The life count */
  count: number;
  /** The life delay options */
  delay: ILifeDelay;
  /** The life duration options */
  duration: ILifeDuration;
}
