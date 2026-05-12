import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape } from "./IEmitterShape.js";
import type { IRandomPositionData } from "./IRandomPositionData.js";

/**
 * Base class for emitter shapes, providing common position, size, and fill handling
 */
export abstract class EmitterShapeBase<TOptions = unknown> implements IEmitterShape {
  /**
   * Sets if the particles will spawn at the shape perimeter or inside the area
   */
  fill: boolean;

  /**
   * The shape options
   */
  options: TOptions;

  /**
   * The shape position
   */
  position: ICoordinates;

  /**
   * The shape size
   */
  size: IDimension;

  /**
   * @param position - the shape position
   * @param size - the shape size
   * @param fill - whether to fill the shape or spawn on the perimeter
   * @param options - the shape options
   */
  protected constructor(position: ICoordinates, size: IDimension, fill: boolean, options: TOptions) {
    this.position = position;
    this.size = size;
    this.fill = fill;
    this.options = options;
  }

  /**
   * Updates the shape position and size
   * @param position - the new position
   * @param size - the new size
   */
  resize(position: ICoordinates, size: IDimension): void {
    this.position = position;
    this.size = size;
  }

  /**
   * Initializes the shape
   */
  abstract init(): Promise<void>;

  /**
   * Gets a random position within or on the perimeter of the shape
   * @returns the random position data, or null if unavailable
   */
  abstract randomPosition(): IRandomPositionData | null;
}
