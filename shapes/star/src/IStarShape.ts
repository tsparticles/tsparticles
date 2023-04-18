import type { IShapeValues, RangeValue } from "tsparticles-engine";

/**
 */
export interface IStarShape extends IShapeValues {
    inset: RangeValue;

    sides: RangeValue;
}
