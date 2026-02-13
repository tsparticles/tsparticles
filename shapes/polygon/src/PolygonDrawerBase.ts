import { type IShapeDrawData, type IShapeDrawer, type Particle, getRangeValue } from "@tsparticles/engine";
import type { IPolygonShape } from "./IPolygonShape.js";
import type { ISide } from "./ISide.js";
import { drawPolygon } from "./Utils.js";

const defaultSides = 5;

/**
 */
export abstract class PolygonDrawerBase implements IShapeDrawer {
  draw(data: IShapeDrawData): void {
    const { particle, radius } = data,
      side = this.getSidesData(particle, radius);

    drawPolygon(data, side);
  }

  getSidesCount(particle: Particle): number {
    const polygon = particle.shapeData as IPolygonShape | undefined;

    return Math.round(getRangeValue(polygon?.sides ?? defaultSides));
  }

  abstract getSidesData(particle: Particle, radius: number): ISide;
}
