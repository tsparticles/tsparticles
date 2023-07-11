import type { IShapeValues, RangeValue } from "tsparticles-engine";

export interface IRoundedPolygonShape extends IShapeValues {
    borderRadius: number;
    sides: RangeValue;
}
