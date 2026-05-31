import type { ITrailFill } from "./ITrailFill.js";

/**
 * The trail mode options
 * [[include:Options/Plugins/Trail.md]]
 */
export interface ITrail {
  /** Enables the trail */
  enable: boolean;

  /** The trail fill options */
  fill: ITrailFill;

  /** The trail length */
  length: number;
}
