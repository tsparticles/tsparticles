import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import { defaultExponent, defaultSteps, drawSquircle } from "./Utils.js";
import type { ISquircleData } from "./ISquircleData.js";
import type { SquircleParticle } from "./SquircleParticle.js";

export class SquircleDrawer implements IShapeDrawer<SquircleParticle> {
  draw(data: IShapeDrawData): void {
    drawSquircle(data);
  }

  particleInit(_container: Container, particle: SquircleParticle): void {
    const shapeData = particle.shapeData as ISquircleData | undefined;

    particle.squircleExponent = getRangeValue(shapeData?.exponent ?? defaultExponent);
    particle.squircleSteps = getRangeValue(shapeData?.steps ?? defaultSteps);
  }
}
