import { PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ISide } from "../../Interfaces/ISide";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import type { IParticle } from "../../Interfaces/IParticle";

export class TriangleDrawer extends PolygonDrawerBase {
    public getSidesData(particle: IParticle, radius: number): ISide {
        const side: ISide = {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: radius * 2,
        };

        return side;
    }

    public getCenter(particle: IParticle, radius: number): ICoordinates {
        const start: ICoordinates = {
            x: -radius,
            y: radius / 1.66,
        };

        return start;
    }
}
