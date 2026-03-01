import type { ITrailColorWeight } from "./ITrailColorWeight.js";
import type { RangeValue } from "@tsparticles/engine";

/**
 * Configuration for a single HSL component mapping
 */
export interface ITrailColorComponent {
  /**
   * The output range for the HSL component (e.g., 0-360 for H, 0-100 for S/L)
   */
  value?: RangeValue;

  /**
   * The influence of each coordinate
   */
  weights?: ITrailColorWeight;
}
