import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import { polygon, roundedPath } from "./Utils.js";
import type { RoundedParticle } from "./RoundedParticle.js";

const defaultSides = 5,
  defaultRadius = 5;

/** Rounded polygon shape drawer plugin */
export class RoundedPolygonDrawer implements IShapeDrawer<RoundedParticle> {
  /**
   * Draws the rounded polygon shape
   * @param data - The data to handle
   */
  draw(data: IShapeDrawData<RoundedParticle>): void {
    const { context, particle, radius } = data;

    roundedPath(context, polygon(particle.sides, radius), particle.borderRadius ?? defaultRadius);
  }

  /**
   * Gets the number of sides
   * @param particle - The particle to process
   * @returns The numeric value
   */
  getSidesCount(particle: RoundedParticle): number {
    const roundedPolygon = particle.shapeData;

    return Math.round(getRangeValue(roundedPolygon?.sides ?? defaultSides));
  }

  /**
   * Initializes the rounded polygon particle properties
   * @param container - The container to handle
   * @param particle - The particle to process
   */
  particleInit(container: Container, particle: RoundedParticle): void {
    const shapeData = particle.shapeData;

    particle.borderRadius = Math.round(getRangeValue(shapeData?.radius ?? defaultSides)) * container.retina.pixelRatio;
  }
}
