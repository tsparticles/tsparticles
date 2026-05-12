import type { ISide } from "./ISide.js";
import { type Particle } from "@tsparticles/engine";
import { PolygonDrawerBase } from "./PolygonDrawerBase.js";

const sides = 3,
  yFactor = 2.66,
  sidesFactor = 3;

/** Triangle shape drawer plugin */
export class TriangleDrawer extends PolygonDrawerBase {
  /** Gets the sides count for a triangle */
  override getSidesCount(): number {
    return sides;
  }

  /**
   * Gets the side data for the triangle
   * @param _particle
   * @param radius
   */
  getSidesData(_particle: Particle, radius: number): ISide {
    return {
      count: {
        denominator: 1,
        numerator: sides,
      },
      length: (radius * yFactor) / (sides / sidesFactor),
    };
  }
}
