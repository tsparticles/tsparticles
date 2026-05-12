import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { ArrowParticle } from "./ArrowParticle.js";
import { drawArrow } from "./Utils.js";

const defaultHeightFactor = 0.5,
  defaultHeadWidthFactor = 0.2,
  defaultBodyHeightFactor = 0.5;

/** Arrow shape drawer plugin */
export class ArrowDrawer implements IShapeDrawer<ArrowParticle> {
  /**
   * Draws the arrow shape
   * @param data
   */
  draw(data: IShapeDrawData<ArrowParticle>): void {
    drawArrow(data);
  }

  /**
   * Initializes arrow-specific particle properties
   * @param _container
   * @param particle
   */
  particleInit(_container: Container, particle: ArrowParticle): void {
    const shapeData = particle.shapeData;

    particle.heightFactor = getRangeValue(shapeData?.heightFactor ?? defaultHeightFactor);
    particle.headWidthFactor = getRangeValue(shapeData?.headWidthFactor ?? defaultHeadWidthFactor);
    particle.bodyHeightFactor = getRangeValue(shapeData?.bodyHeightFactor ?? defaultBodyHeightFactor);
  }
}
