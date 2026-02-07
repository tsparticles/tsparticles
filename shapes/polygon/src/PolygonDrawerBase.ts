import {
  CachePolicy,
  type ICoordinates,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  type Particle,
  TextureColorMode,
  getRangeValue,
} from "@tsparticles/engine";
import type { IPolygonShape } from "./IPolygonShape.js";
import type { ISide } from "./ISide.js";
import { drawPolygon } from "./Utils.js";

const defaultSides = 5,
  defaultPadding = 0.5;

/**
 */
export abstract class PolygonDrawerBase implements IShapeDrawer {
  draw(data: IShapeDrawData): void {
    const { particle, radius } = data,
      start = this.getCenter(particle, radius),
      side = this.getSidesData(particle, radius);

    drawPolygon(data, start, side);
  }

  getDescriptor(particle: Particle): string {
    return `polygon:${particle.sides}`;
  }

  getMetadata(particle: Particle): ITextureMetadata {
    const radius = particle.getRadius(),
      padding = radius * defaultPadding;

    return {
      cachePolicy: CachePolicy.Static,
      colorMode: TextureColorMode.Single,
      padding,
    };
  }

  getSidesCount(particle: Particle): number {
    const polygon = particle.shapeData as IPolygonShape | undefined;

    return Math.round(getRangeValue(polygon?.sides ?? defaultSides));
  }

  abstract getCenter(particle: Particle, radius: number): ICoordinates;

  abstract getSidesData(particle: Particle, radius: number): ISide;
}
