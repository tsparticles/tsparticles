import { PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ISide } from "../../Interfaces/ISide";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import type { IParticle } from "../../Interfaces/IParticle";
import { IPolygonShape } from "../../Interfaces/Options/Particles/Shape/IPolygonShape";

export class PolygonDrawer extends PolygonDrawerBase {
    public getSidesData(particle: IParticle, radius: number): ISide {
        const polygon = particle.shapeData as IPolygonShape;
        const sides = polygon?.sides ?? polygon?.nb_sides ?? 5;
        const side: ISide = {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: radius * 2.66 / (sides / 3),
        };

        return side;
    }

    public getCenter(particle: IParticle, radius: number): ICoordinates {
        const polygon = particle.shapeData as IPolygonShape;
        const sides = polygon?.sides ?? polygon?.nb_sides ?? 5;
        const start: ICoordinates = {
            x: -radius / (sides / 3.5),
            y: -radius / (2.66 / 3.5),
        };

        return start;
    }
}
