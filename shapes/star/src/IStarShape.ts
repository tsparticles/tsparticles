import type { IShapeValues, RangeValue } from "tsparticles-engine";

/**
 * @category Options
 */
export interface IStarShape extends IShapeValues {
    inset: RangeValue;

    sides: RangeValue;
}
