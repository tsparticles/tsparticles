import type { IValueWithRandom } from "@tsparticles/engine";

/** The life duration options */
export interface ILifeDuration extends IValueWithRandom {
  /** Enables the life duration sync */
  sync: boolean;
}
