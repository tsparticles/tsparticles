import {
  CachePolicy,
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  type Particle,
  TextureColorMode,
  getRangeValue,
} from "@tsparticles/engine";
import { polygon, roundedPath } from "./Utils.js";
import type { IRoundedPolygonShape } from "./IRoundedPolygonShape.js";
import type { RoundedParticle } from "./RoundedParticle.js";

const defaultSides = 5,
  defaultRadius = 5,
  defaultPadding = 0.5;

/**
 */
export class RoundedPolygonDrawer implements IShapeDrawer<RoundedParticle> {
  draw(data: IShapeDrawData<RoundedParticle>): void {
    const { context, particle, radius } = data;

    roundedPath(context, polygon(particle.sides, radius), particle.borderRadius ?? defaultRadius);
  }

  getDescriptor(particle: RoundedParticle): string {
    return `rounded-polygon:${particle.sides}:${particle.borderRadius ?? defaultRadius}`;
  }

  getMetadata(particle: RoundedParticle): ITextureMetadata {
    const radius = particle.getRadius(),
      padding = radius * defaultPadding;

    return {
      cachePolicy: CachePolicy.Static,
      colorMode: TextureColorMode.Single,
      padding,
    };
  }

  getSidesCount(particle: Particle): number {
    const roundedPolygon = particle.shapeData as IRoundedPolygonShape | undefined;

    return Math.round(getRangeValue(roundedPolygon?.sides ?? defaultSides));
  }

  particleInit(container: Container, particle: RoundedParticle): void {
    const shapeData = particle.shapeData as IRoundedPolygonShape | undefined;

    particle.borderRadius = Math.round(getRangeValue(shapeData?.radius ?? defaultSides)) * container.retina.pixelRatio;
  }
}
