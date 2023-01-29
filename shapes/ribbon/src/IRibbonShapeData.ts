import type { IShapeValues, RangeValue } from "@tsparticles/engine";

export interface IRibbonShapeData extends IShapeValues {
    distance: RangeValue;
    length: RangeValue;
}
