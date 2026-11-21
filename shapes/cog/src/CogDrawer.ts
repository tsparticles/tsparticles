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
   * @param data - The data to handle
   */
  afterDraw(data: IShapeDrawData<CogParticle>): void {
    drawCogHole(data);
  }

  /**
   * Draws the cog shape
   * @param data - The data to handle
   */
  draw(data: IShapeDrawData<CogParticle>): void {
    drawCog(data);
  }

  /**
   * Initializes cog-specific particle properties
   * @param _container - The container to handle
   * @param particle - The particle to process
   */
  particleInit(container: Container, particle: CogParticle): void {
    const shapeData = particle.shapeData,
      random = container.engine.getRandomFn();

    particle.cogHoleRadius = getRangeValue(shapeData?.holeRadius ?? defaultHoleRadius, random);
    particle.cogInnerRadius = getRangeValue(shapeData?.innerRadius ?? defaultInnerRadius, random);
    particle.cogInnerTaper = getRangeValue(shapeData?.innerTaper ?? defaultInnerTaper, random);
    particle.cogNotches = getRangeValue(shapeData?.notches ?? defaultNotches, random);
    particle.cogOuterTaper = getRangeValue(shapeData?.outerTaper ?? defaultOuterTaper, random);
  }
}
