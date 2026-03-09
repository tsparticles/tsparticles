import type { ISide } from "./ISide.js";
import { type Particle } from "@tsparticles/engine";
import { PolygonDrawerBase } from "./PolygonDrawerBase.js";

const sides = 3,
  yFactor = 2.66,
  sidesFactor = 3;

/**
 */
export class TriangleDrawer extends PolygonDrawerBase {
  override getSidesCount(): number {
    return sides;
  }

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
