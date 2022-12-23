import type { IShapeValues, RangeValue } from "tsparticles-engine";

export interface IPolygonShape extends IShapeValues {
    sides: RangeValue;
}
