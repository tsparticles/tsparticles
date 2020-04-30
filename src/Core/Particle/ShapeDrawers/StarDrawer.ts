import { PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ISide } from "../../Interfaces/ISide";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import type { IParticle } from "../../Interfaces/IParticle";
import type { IPolygonShape } from "../../../Options/Interfaces/Particles/Shape/IPolygonShape";

export class StarDrawer extends PolygonDrawerBase {
    public getSidesData(particle: IParticle, radius: number): ISide {
        const polygon = particle.shapeData as IPolygonShape;
        const sides = polygon?.sides ?? 5;

        return {
            count: {
                denominator: 2,
                numerator: sides,
            },
            length: radius * 2 * 2.66 / (sides / 3),
        };
    }

    public getCenter(particle: IParticle, radius: number): ICoordinates {
        const polygon = particle.shapeData as IPolygonShape;
        const sides = polygon?.sides ?? 5;

        return {
            x: -radius * 2 / (sides / 4),
            y: -radius / (2 * 2.66 / 3.5),
        };
    }
}
