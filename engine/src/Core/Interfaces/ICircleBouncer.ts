import type { ICoordinates } from "./ICoordinates.js";
import type { Vector } from "../Utils/Vectors.js";

/** Circle bounce data used for particle-particle collision bouncing */
export interface ICircleBouncer {
  /** Bounce factor vector */
  factor: Vector;
  /** Particle mass for collision calculation */
  mass: number;
  /** Current position */
  position: ICoordinates;
  /** Particle radius */
  radius: number;
  /** Current velocity vector */
  velocity: Vector;
}
