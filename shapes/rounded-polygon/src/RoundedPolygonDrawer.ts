import {
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type Particle,
  getRangeValue,
} from "@tsparticles/engine";
import { polygon, roundedPath } from "./Utils.js";
import type { IRoundedPolygonShape } from "./IRoundedPolygonShape.js";
import type { RoundedParticle } from "./RoundedParticle.js";

const defaultSides = 5,
  defaultRadius = 5;

/**
 */
export class RoundedPolygonDrawer implements IShapeDrawer<RoundedParticle> {
  private readonly _container;

  constructor(container: Container) {
    this._container = container;
  }

  draw(data: IShapeDrawData<RoundedParticle>): void {
    const { context, particle, radius } = data;

    roundedPath(context, polygon(particle.sides, radius), particle.borderRadius ?? defaultRadius);
  }

  getSidesCount(particle: Particle): number {
    const roundedPolygon = particle.shapeData as IRoundedPolygonShape | undefined;

    return Math.round(getRangeValue(roundedPolygon?.sides ?? defaultSides));
  }

  particleInit(particle: RoundedParticle): void {
    const shapeData = particle.shapeData as IRoundedPolygonShape | undefined;

    particle.borderRadius =
      Math.round(getRangeValue(shapeData?.radius ?? defaultSides)) * this._container.retina.pixelRatio;
  }
}
