import type { RangeValue } from "@tsparticles/engine";

/** The destroy bounds options */
export interface IDestroyBounds {
  /** The bottom bound */
  bottom?: RangeValue;
  /** The left bound */
  left?: RangeValue;
  /** The right bound */
  right?: RangeValue;
  /** The top bound */
  top?: RangeValue;
}
