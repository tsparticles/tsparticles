import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import { drawCog, drawCogHole } from "./Utils.js";
import type { CogParticle } from "./CogParticle.js";

const defaultHoleRadius = 44,
  defaultInnerRadius = 72,
  defaultInnerTaper = 35,
  defaultNotches = 7,
  defaultOuterTaper = 50;

/** Cog shape drawer plugin */
export class CogDrawer implements IShapeDrawer<CogParticle> {
  /**
   * Draws the cog hole after the main shape
   * @param data
   */
  afterDraw(data: IShapeDrawData<CogParticle>): void {
    drawCogHole(data);
  }

  /**
   * Draws the cog shape
   * @param data
   */
  draw(data: IShapeDrawData<CogParticle>): void {
    drawCog(data);
  }

  /**
   * Initializes cog-specific particle properties
   * @param _container
   * @param particle
   */
  particleInit(_container: Container, particle: CogParticle): void {
    const shapeData = particle.shapeData;

    particle.cogHoleRadius = getRangeValue(shapeData?.holeRadius ?? defaultHoleRadius);
    particle.cogInnerRadius = getRangeValue(shapeData?.innerRadius ?? defaultInnerRadius);
    particle.cogInnerTaper = getRangeValue(shapeData?.innerTaper ?? defaultInnerTaper);
    particle.cogNotches = getRangeValue(shapeData?.notches ?? defaultNotches);
    particle.cogOuterTaper = getRangeValue(shapeData?.outerTaper ?? defaultOuterTaper);
  }
}
