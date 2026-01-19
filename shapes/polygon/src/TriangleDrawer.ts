import { type ICoordinates, type Particle, double } from "@tsparticles/engine";
import type { ISide } from "./ISide.js";
import { PolygonDrawerBase } from "./PolygonDrawerBase.js";

const yFactor = 1.66,
    sides = 3;

/**
 */
export class TriangleDrawer extends PolygonDrawerBase {
    readonly validTypes = ["triangle"] as const;

    getCenter(_particle: Particle, radius: number): ICoordinates {
        return {
            x: -radius,
            y: radius / yFactor,
        };
    }

    override getSidesCount(): number {
        return sides;
    }

    getSidesData(_particle: Particle, radius: number): ISide {
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
