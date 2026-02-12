import { type Particle, double } from "@tsparticles/engine";
import type { ISide } from "./ISide.js";
import { PolygonDrawerBase } from "./PolygonDrawerBase.js";

const sides = 3;

/**
 */
export class TriangleDrawer extends PolygonDrawerBase {
  override getSidesCount(): number {
    return sides;
  }

  getSidesData(_particle: Particle, radius: number): ISide {
    return {
      count: {
        denominator: 2,
        numerator: 3,
      },
      length: radius * double,
    };
  }
}
