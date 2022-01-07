import type { ICoordinates, IParticle, IShapeDrawer } from "../../Core";
import type { IPolygonShape } from "../../Options/Interfaces/Particles/Shape/IPolygonShape";

export interface ISideCount {
    numerator: number;
    denominator: number;
}

export interface ISide {
    count: ISideCount;
    length: number;
}

/**
 * @category Shape Drawers
 */
export abstract class PolygonDrawerBase implements IShapeDrawer {
    getSidesCount(particle: IParticle): number {
        const polygon = particle.shapeData as IPolygonShape;

        return polygon?.sides ?? polygon?.nb_sides ?? 5;
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const start = this.getCenter(particle, radius);
        const side = this.getSidesData(particle, radius);

        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        const sideCount = side.count.numerator * side.count.denominator;
        const decimalSides = side.count.numerator / side.count.denominator;
        const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        const interiorAngle = Math.PI - (Math.PI * interiorAngleDegrees) / 180; // convert to radians

        if (!context) {
            return;
        }

        context.beginPath();
        context.translate(start.x, start.y);
        context.moveTo(0, 0);

        for (let i = 0; i < sideCount; i++) {
            context.lineTo(side.length, 0);
            context.translate(side.length, 0);
            context.rotate(interiorAngle);
        }
    }

    public abstract getSidesData(particle: IParticle, radius: number): ISide;

    public abstract getCenter(particle: IParticle, radius: number): ICoordinates;
}
