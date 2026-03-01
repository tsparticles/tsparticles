import type { ISide } from "./ISide.js";
import type { Particle } from "@tsparticles/engine";
import { PolygonDrawerBase } from "./PolygonDrawerBase.js";

const yFactor = 2.66,
  sidesFactor = 3;

/**
 */
export class PolygonDrawer extends PolygonDrawerBase {
  getSidesData(particle: Particle, radius: number): ISide {
    const { sides } = particle;

    return {
      count: {
        denominator: 1,
        numerator: sides,
      },
      length: (radius * yFactor) / (sides / sidesFactor),
    };
  }
}
