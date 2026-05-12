import { type Container, type IShapeDrawData, type IShapeDrawer, double, getRangeValue } from "@tsparticles/engine";
import type { RoundedParticle } from "./RoundedParticle.js";
import { drawRoundedRect } from "./Utils.js";

const defaultRadius = 5;

/** Rounded rectangle shape drawer plugin */
export class RoundedRectDrawer implements IShapeDrawer<RoundedParticle> {
  /**
   * Draws the rounded rectangle shape
   * @param data
   */
  draw(data: IShapeDrawData<RoundedParticle>): void {
    const { context, particle, radius } = data,
      fixedRadius = radius * Math.SQRT1_2,
      fixedDiameter = fixedRadius * double,
      borderRadius = particle.borderRadius ?? defaultRadius;

    if ("roundRect" in context) {
      context.roundRect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter, borderRadius);
    } else {
      drawRoundedRect(context, fixedRadius, fixedDiameter, borderRadius);
    }
  }

  /**
   * Initializes the rounded rectangle particle properties
   * @param container
   * @param particle
   */
  particleInit(container: Container, particle: RoundedParticle): void {
    const shapeData = particle.shapeData;

    particle.borderRadius = getRangeValue(shapeData?.radius ?? defaultRadius) * container.retina.pixelRatio;
  }
}
