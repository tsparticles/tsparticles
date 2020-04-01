import { PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ISide } from "../../Interfaces/ISide";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import type { IParticle } from "../../Interfaces/IParticle";

export class StartDrawer extends PolygonDrawerBase {
    public getSidesData(particle: IParticle, radius: number): ISide {
        const sides = particle.polygon?.sides ?? 5;
        const side: ISide = {
            count: {
                denominator: 2,
                numerator: sides,
            },
            length: radius * 2 * 2.66 / (sides / 3),
        };

        return side;
    }

    public getCenter(particle: IParticle, radius: number): ICoordinates {
        const sides = particle.polygon?.sides ?? 5;
        const start: ICoordinates = {
            x: -radius * 2 / (sides / 4),
            y: -radius / (2 * 2.66 / 3.5),
        };

        return start;
    }
}
