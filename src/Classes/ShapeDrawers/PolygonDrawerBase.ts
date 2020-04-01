import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { ISide } from "../../Interfaces/ISide";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import type { IParticle } from "../../Interfaces/IParticle";

export abstract class PolygonDrawerBase implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const start = this.getCenter(particle, radius);
        const side = this.getSidesData(particle, radius);

        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        const sideCount = side.count.numerator * side.count.denominator;
        const decimalSides = side.count.numerator / side.count.denominator;
        const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        const interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians

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
