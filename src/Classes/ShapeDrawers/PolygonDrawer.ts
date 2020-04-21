import { PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ISide } from "../../Interfaces/ISide";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import type { IParticle } from "../../Interfaces/IParticle";
import type { IPolygonShape } from "../../Interfaces/Options/Particles/Shape/IPolygonShape";

export class PolygonDrawer extends PolygonDrawerBase {
    public getSidesData(particle: IParticle, radius: number): ISide {
        const polygon = particle.shapeData as IPolygonShape;
        const sides = polygon?.sides ?? polygon?.nb_sides ?? 5;

        return {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: radius * 2.66 / (sides / 3),
        };
    }

    public getCenter(particle: IParticle, radius: number): ICoordinates {
        const polygon = particle.shapeData as IPolygonShape;
        const sides = polygon?.sides ?? polygon?.nb_sides ?? 5;

        return {
            x: -radius / (sides / 3.5),
            y: -radius / (2.66 / 3.5),
        };
    }
}
