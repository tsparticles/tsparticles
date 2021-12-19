import type { ISide } from "./PolygonDrawerBase";
import { PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ICoordinates, IParticle } from "tsparticles-engine";
import type { IPolygonShape } from "./IPolygonShape";

/**
 * @category Shape Drawers
 */
export class PolygonDrawer extends PolygonDrawerBase {
    getSidesData(particle: IParticle, radius: number): ISide {
        const polygon = particle.shapeData as IPolygonShape;
        const sides = polygon?.sides ?? polygon?.nb_sides ?? 5;

        return {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: (radius * 2.66) / (sides / 3),
        };
    }

    getCenter(particle: IParticle, radius: number): ICoordinates {
        const sides = this.getSidesCount(particle);

        return {
            x: -radius / (sides / 3.5),
            y: -radius / (2.66 / 3.5),
        };
    }
}
