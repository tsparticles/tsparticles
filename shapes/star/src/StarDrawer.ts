import {
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type Particle,
  getRangeValue,
} from "@tsparticles/engine";
import type { IStarShape } from "./IStarShape.js";
import type { StarParticle } from "./StarParticle.js";
import { drawStar } from "./Utils.js";

const defaultInset = 2,
  defaultSides = 5;

/** Star shape drawer plugin */
export class StarDrawer implements IShapeDrawer<StarParticle> {
  /**
   * Draws the star shape
   * @param data - The data to handle
   */
  draw(data: IShapeDrawData<StarParticle>): void {
    drawStar(data);
  }

  /**
   * Gets the number of sides for this shape
   * @param particle - The particle to process
   * @returns The numeric value
   */
  getSidesCount(particle: Particle): number {
    const star = particle.shapeData as IStarShape | undefined;

    return Math.round(getRangeValue(star?.sides ?? defaultSides));
  }

  /**
   * Initializes the star inset for the particle
   * @param _container - The container to handle
   * @param particle - The particle to process
   */
  particleInit(_container: Container, particle: StarParticle): void {
    const star = particle.shapeData as IStarShape | undefined;

    particle.starInset = getRangeValue(star?.inset ?? defaultInset);
  }
}
