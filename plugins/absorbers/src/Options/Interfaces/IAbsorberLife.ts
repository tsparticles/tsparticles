import type { RangeValue } from "@tsparticles/engine";

/**
 * The particles absorber life options
 */
export interface IAbsorberLife {
  /**
   * The count of lives the particles absorber has.
   * If \<= 0 or not specified infinity will be the value.
   * If the count is \> 0 it will spawn only that number of times then it'll be destroyed and removed
   */
  count?: number;

  /**
   * The delay between any spawn, except first.
   */
  delay?: RangeValue;

  /**
   * The duration of any absorber life.
   * If \<= 0 or not specified infinity will be the value.
   */
  duration?: RangeValue;

  /**
   * If enabled the first delay will be applied
   */
  wait: boolean;
}
