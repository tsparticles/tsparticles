import type { IShapeValues, RangeValue } from "tsparticles-engine";

export interface IArrowData extends IShapeValues {
    bodyHeightFactor?: RangeValue;
    headWidthFactor?: RangeValue;
    heightFactor?: RangeValue;
}
