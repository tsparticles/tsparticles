import type { ICoordinates, Particle } from "@tsparticles/engine";
import type { ISide } from "./ISide.js";
import { PolygonDrawerBase } from "./PolygonDrawerBase.js";

const yFactor = 1.66,
    sides = 3,
    double = 2;

/**
 */
export class TriangleDrawer extends PolygonDrawerBase {
    readonly validTypes = ["triangle"] as const;

    getCenter(particle: Particle, radius: number): ICoordinates {
        return {
            x: -radius,
            y: radius / yFactor,
        };
    }

    getSidesCount(): number {
        return sides;
    }

    getSidesData(particle: Particle, radius: number): ISide {
        const diameter = radius * double;

        return {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: diameter,
        };
    }
}
