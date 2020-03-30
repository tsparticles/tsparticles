import { PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ISide } from "../../Interfaces/ISide";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import { GenericDrawerData } from "./Parameters/GenericDrawerData";

export class PolygonDrawer extends PolygonDrawerBase {
    public getSidesData(data: GenericDrawerData): ISide {
        const sides = data.particle.polygon?.sides ?? 5;
        const side: ISide = {
            count: {
                denominator: 1,
                numerator: sides ?? 5,
            },
            length: data.radius * 2.66 / (sides / 3),
        };

        return side;
    }

    public getCenter(data: GenericDrawerData): ICoordinates {
        const sides = data.particle.polygon?.sides ?? 5;
        const start: ICoordinates = {
            x: -data.radius / (sides / 3.5),
            y: -data.radius / (2.66 / 3.5),
        };

        return start;
    }
}
