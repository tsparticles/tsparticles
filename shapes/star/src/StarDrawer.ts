import { type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { StarParticle } from "./StarParticle.js";
import { drawStar } from "./Utils.js";

const defaultInset = 2,
  defaultSides = 5;

/**
 */
export class StarDrawer implements IShapeDrawer<StarParticle> {
  draw(data: IShapeDrawData<StarParticle>): void {
    drawStar(data);
  }

  getSidesCount(particle: StarParticle): number {
    const star = particle.shapeData;

    return Math.round(getRangeValue(star?.sides ?? defaultSides));
  }

  particleInit(particle: StarParticle): void {
    const star = particle.shapeData;

    particle.starInset = getRangeValue(star?.inset ?? defaultInset);
  }
}
