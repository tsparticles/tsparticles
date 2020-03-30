import { PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ISide } from "../../Interfaces/ISide";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import { GenericDrawerData } from "./Parameters/GenericDrawerData";

export class TriangleDrawer extends PolygonDrawerBase {
    public getSidesData(data: GenericDrawerData): ISide {
        const side: ISide = {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: data.radius * 2,
        };

        return side;
    }

    public getCenter(data: GenericDrawerData): ICoordinates {
        const start: ICoordinates = {
            x: -data.radius,
            y: data.radius / 1.66,
        };

        return start;
    }
}
