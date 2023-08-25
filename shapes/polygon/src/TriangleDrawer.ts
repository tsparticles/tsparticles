import type { ICoordinates, Particle } from "@tsparticles/engine";
import type { ISide } from "./ISide.js";
import { PolygonDrawerBase } from "./PolygonDrawerBase.js";

/**
 */
export class TriangleDrawer extends PolygonDrawerBase {
    getCenter(particle: Particle, radius: number): ICoordinates {
        return {
            x: -radius,
            y: radius / 1.66,
        };
    }

    getSidesCount(): number {
        return 3;
    }

    getSidesData(particle: Particle, radius: number): ISide {
        return {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: radius * 2,
        };
    }
}
