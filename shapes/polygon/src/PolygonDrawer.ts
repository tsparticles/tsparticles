import type { ICoordinates, Particle } from "tsparticles-engine";
import type { ISide } from "./ISide";
import { PolygonDrawerBase } from "./PolygonDrawerBase";

/**
 * @category Shape Drawers
 */
export class PolygonDrawer extends PolygonDrawerBase {
    getCenter(particle: Particle, radius: number): ICoordinates {
        return {
            x: -radius / (particle.sides / 3.5),
            y: -radius / (2.66 / 3.5),
        };
    }

    getSidesData(particle: Particle, radius: number): ISide {
        const sides = particle.sides;

        return {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: (radius * 2.66) / (sides / 3),
        };
    }
}
