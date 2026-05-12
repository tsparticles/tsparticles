import type { IValueWithRandom } from "@tsparticles/engine";

/** The life delay options */
export interface ILifeDelay extends IValueWithRandom {
  /** Enables the life delay sync */
  sync: boolean;
}
