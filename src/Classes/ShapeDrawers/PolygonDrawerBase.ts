import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IShapeDrawerData } from "../../Interfaces/IShapeDrawerData";
import type { ISide } from "../../Interfaces/ISide";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import { GenericDrawerData } from "./Parameters/GenericDrawerData";

export abstract class PolygonDrawerBase implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, data: IShapeDrawerData): void {
        const start = this.getCenter(data);
        const side = this.getSidesData(data);

        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        const sideCount = side.count.numerator * side.count.denominator;
        const decimalSides = side.count.numerator / side.count.denominator;
        const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        const interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians

        if (!context) {
            return;
        }

        context.save();
        context.beginPath();
        context.translate(start.x, start.y);
        context.moveTo(0, 0);

        for (let i = 0; i < sideCount; i++) {
            context.lineTo(side.length, 0);
            context.translate(side.length, 0);
            context.rotate(interiorAngle);
        }

        // c.stroke();
        context.fill();
        context.restore();
    }

    public abstract getSidesData(data: IShapeDrawerData): ISide;
    public abstract getCenter(data: IShapeDrawerData): ICoordinates;

    public createData(): IShapeDrawerData {
        return new GenericDrawerData();
    }
}