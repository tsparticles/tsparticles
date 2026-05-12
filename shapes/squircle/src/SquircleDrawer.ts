import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import { defaultExponent, defaultSteps, drawSquircle } from "./Utils.js";
import type { SquircleParticle } from "./SquircleParticle.js";

/** Squircle shape drawer plugin */
export class SquircleDrawer implements IShapeDrawer<SquircleParticle> {
  /**
   * Draws the squircle shape
   * @param data
   */
  draw(data: IShapeDrawData): void {
    drawSquircle(data);
  }

  /**
   * Initializes squircle-specific particle properties
   * @param _container
   * @param particle
   */
  particleInit(_container: Container, particle: SquircleParticle): void {
    const shapeData = particle.shapeData;

    particle.squircleExponent = getRangeValue(shapeData?.exponent ?? defaultExponent);
    particle.squircleSteps = getRangeValue(shapeData?.steps ?? defaultSteps);
  }
}
