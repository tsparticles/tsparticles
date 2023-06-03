import type { IShapeValues, RangeValue } from "tsparticles-engine";

export interface ICogData extends IShapeValues {
    holeRadius?: RangeValue;
    innerRadius?: RangeValue;
    innerTaper?: RangeValue;
    notches?: RangeValue;
    outerTaper?: RangeValue;
}
