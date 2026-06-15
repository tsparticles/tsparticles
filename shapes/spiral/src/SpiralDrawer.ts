import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { SpiralParticle } from "./SpiralParticle.js";
import { drawSpiral } from "./Utils.js";

const defaultInnerRadius = 1,
  defaultLineSpacing = 1,
  defaultWidthFactor = 10;

/** Spiral shape drawer plugin */
export class SpiralDrawer implements IShapeDrawer<SpiralParticle> {
  /**
   * Draws the spiral shape
   * @param data - The data to handle
   */
  draw(data: IShapeDrawData<SpiralParticle>): void {
    drawSpiral(data);
  }

  /**
   * Initializes spiral-specific particle properties
   * @param container - The container to handle
   * @param particle - The particle to process
   */
  particleInit(container: Container, particle: SpiralParticle): void {
    const pixelRatio = container.retina.pixelRatio,
      shapeData = particle.shapeData;

    particle.spiralInnerRadius = getRangeValue(shapeData?.innerRadius ?? defaultInnerRadius) * pixelRatio;
    particle.spiralLineSpacing = getRangeValue(shapeData?.lineSpacing ?? defaultLineSpacing) * pixelRatio;
    particle.spiralWidthFactor = getRangeValue(shapeData?.widthFactor ?? defaultWidthFactor);
  }
}
