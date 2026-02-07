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
import type { IStarShape } from "./IStarShape.js";
import type { StarParticle } from "./StarParticle.js";
import { drawStar } from "./Utils.js";

const defaultInset = 2,
  defaultSides = 5,
  defaultPadding = 1;

/**
 */
export class StarDrawer implements IShapeDrawer<StarParticle> {
  draw(data: IShapeDrawData<StarParticle>): void {
    drawStar(data);
  }

  getDescriptor(particle: StarParticle): string {
    return `star:${particle.sides}:${particle.starInset ?? defaultInset}`;
  }

  getMetadata(particle: StarParticle): ITextureMetadata {
    const radius = particle.getRadius(),
      padding = radius * defaultPadding;

    return {
      cachePolicy: CachePolicy.Static,
      colorMode: TextureColorMode.Single,
      padding,
    };
  }

  getSidesCount(particle: Particle): number {
    const star = particle.shapeData as IStarShape | undefined;

    return Math.round(getRangeValue(star?.sides ?? defaultSides));
  }

  particleInit(_container: Container, particle: StarParticle): void {
    const star = particle.shapeData as IStarShape | undefined;

    particle.starInset = getRangeValue(star?.inset ?? defaultInset);
  }
}
