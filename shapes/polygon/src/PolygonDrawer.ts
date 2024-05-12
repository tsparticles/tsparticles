import type { ICoordinates, Particle } from "@tsparticles/engine";
import type { ISide } from "./ISide.js";
import { PolygonDrawerBase } from "./PolygonDrawerBase.js";

const sidesCenterFactor = 3.5,
    yFactor = 2.66,
    sidesFactor = 3;

/**
 */
export class PolygonDrawer extends PolygonDrawerBase {
    readonly validTypes = ["polygon"] as const;

    getCenter(particle: Particle, radius: number): ICoordinates {
        return {
            x: -radius / (particle.sides / sidesCenterFactor),
            y: -radius / (yFactor / sidesCenterFactor),
        };
    }

    getSidesData(particle: Particle, radius: number): ISide {
        const sides = particle.sides;

        return {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: (radius * yFactor) / (sides / sidesFactor),
        };
    }
}
