import type { IShapeValues, RangeValue } from "@tsparticles/engine";

export interface IRoundedPolygonShape extends IShapeValues {
  radius: number;
  sides: RangeValue;
}
