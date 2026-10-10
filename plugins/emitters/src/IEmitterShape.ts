import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IRandomPositionData } from "./IRandomPositionData.js";

export interface IEmitterShape {
  /**
   * Draws the shape geometry into the canvas current path, centered on the shape position and
   * using the shape size. Implementations only trace the geometry; the fill/stroke round-trip
   * is owned by the emitter instance.
   * @param context - the canvas 2d context used for drawing
   */
  draw?(context: OffscreenCanvasRenderingContext2D): void;

  init(): Promise<void>;

  randomPosition(): IRandomPositionData | null;

  resize(position: ICoordinates, size: IDimension): void;
}
