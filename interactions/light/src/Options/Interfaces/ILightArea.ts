import type { ILightGradient } from "./ILightGradient.js";

/** Light area options */
export interface ILightArea {
  /** The light gradient options */
  gradient: ILightGradient;
  /** The light radius */
  radius: number;
}
