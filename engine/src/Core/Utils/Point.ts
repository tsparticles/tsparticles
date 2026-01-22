import type { ICoordinates } from "../Interfaces/ICoordinates.js";
import type { Particle } from "../Particle.js";

/**
 */
export class Point {
  readonly particle: Particle;
  readonly position: ICoordinates;

  /**
   * The point constructor, initializing its position
   * @param position - the point position
   * @param particle - the particle assigned to this point
   */
  constructor(position: ICoordinates, particle: Particle) {
    this.position = position;
    this.particle = particle;
  }
}
