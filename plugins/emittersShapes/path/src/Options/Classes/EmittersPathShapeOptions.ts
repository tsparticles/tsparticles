import { type ICoordinates, type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IEmittersPathShapeOptions } from "../Interfaces/IEmittersPathShapeOptions.js";

const defaultPosition: ICoordinates = { x: 50, y: 50 };

/**
 * Path shape options for the emitter
 */
export class EmittersPathShapeOptions implements IEmittersPathShapeOptions, IOptionLoader<IEmittersPathShapeOptions> {
  /**
   * The points defining the path
   */
  points: ICoordinates[];

  constructor() {
    this.points = [];
  }

  /**
   * Loads the path shape options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IEmittersPathShapeOptions>): void {
    if (isNull(data)) {
      return;
    }

    if (data.points !== undefined) {
      this.points = data.points.map(t => ({ x: t.x ?? defaultPosition.x, y: t.y ?? defaultPosition.y }));
    }
  }
}
