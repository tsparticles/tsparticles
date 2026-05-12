import { type IShapeDrawData, type IShapeDrawer, type Particle, getRangeValue } from "@tsparticles/engine";
import type { IPolygonShape } from "./IPolygonShape.js";
import type { ISide } from "./ISide.js";
import { drawPolygon } from "./Utils.js";

const defaultSides = 5;

/** Base class for polygon-based shape drawers */
export abstract class PolygonDrawerBase implements IShapeDrawer {
  /**
   * Draws the polygon shape
   * @param data
   */
  draw(data: IShapeDrawData): void {
    const { particle, radius } = data,
      side = this.getSidesData(particle, radius);

    drawPolygon(data, side);
  }

  /**
   * Gets the number of sides for the polygon
   * @param particle
   */
  getSidesCount(particle: Particle): number {
    const polygon = particle.shapeData as IPolygonShape | undefined;

    return Math.round(getRangeValue(polygon?.sides ?? defaultSides));
  }

  /** Gets the side data for computing polygon vertices */
  abstract getSidesData(particle: Particle, radius: number): ISide;
}
