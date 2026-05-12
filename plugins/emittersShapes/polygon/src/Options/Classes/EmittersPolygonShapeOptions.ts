import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IEmittersPolygonShapeOptions } from "../Interfaces/IEmittersPolygonShapeOptions.js";

/**
 * Polygon shape options for the emitter
 */
export class EmittersPolygonShapeOptions
  implements IEmittersPolygonShapeOptions, IOptionLoader<IEmittersPolygonShapeOptions>
{
  /**
   * The rotation angle of the polygon in radians
   */
  angle: number;
  /**
   * The number of sides of the polygon
   */
  sides: number;

  constructor() {
    this.angle = 0;
    this.sides = 5;
  }

  /**
   * Loads the polygon shape options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IEmittersPolygonShapeOptions>): void {
    if (isNull(data)) {
      return;
    }

    if (data.angle !== undefined) {
      this.angle = data.angle;
    }

    if (data.sides !== undefined) {
      this.sides = data.sides;
    }
  }
}
