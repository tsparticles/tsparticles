import { PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ISide } from "../../Interfaces/ISide";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import { GenericDrawerData } from "./Parameters/GenericDrawerData";

export class StartDrawer extends PolygonDrawerBase {
    public getSidesData(data: GenericDrawerData): ISide {
        const sides = data.particle.polygon?.sides ?? 5;
        const side: ISide = {
            count: {
                denominator: 2,
                numerator: sides,
            },
            length: data.radius * 2 * 2.66 / (sides / 3),
        };

        return side;
    }

    public getCenter(data: GenericDrawerData): ICoordinates {
        const sides = data.particle.polygon?.sides ?? 5;
        const start: ICoordinates = {
            x: -data.radius * 2 / (sides / 4),
            y: -data.radius / (2 * 2.66 / 3.5),
        };

        return start;
    }
}
