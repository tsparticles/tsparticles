import type { ITrailFill } from "./ITrailFill.js";

/** The trail mode options */
export interface ITrail {
  /** Enables the trail */
  enable: boolean;

  /** The trail fill options */
  fill: ITrailFill;

  /** The trail length */
  length: number;
}
