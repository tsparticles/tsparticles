import type { IAbsorberSizeLimit } from "./IAbsorberSizeLimit.js";
import type { IValueWithRandom } from "@tsparticles/engine";

/** The absorber size options */
export interface IAbsorberSize extends IValueWithRandom {
  /** The absorber size density */
  density: number;
  /** The absorber size limit */
  limit?: number | IAbsorberSizeLimit;
}
