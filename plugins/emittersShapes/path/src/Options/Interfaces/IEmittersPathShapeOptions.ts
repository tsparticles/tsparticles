import type { ICoordinates } from "@tsparticles/engine";

/** Path shape options for the emitter */
export interface IEmittersPathShapeOptions {
  /** The points defining the path */
  points: ICoordinates[];
}
