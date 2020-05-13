import { Range } from "./Range";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { Rectangle } from "./Rectangle";
import { Circle } from "./Circle";
import type { IDimension } from "../Core/Interfaces/IDimension";

export class CircleWarp extends Circle {
    private readonly canvasSize: IDimension;

    constructor(x: number, y: number, radius: number, canvasSize: IDimension) {
        super(x, y, radius);

        this.canvasSize = {
            height: canvasSize.height,
            width: canvasSize.width,
        };
    }

    public contains(point: ICoordinates): boolean {
        if (super.contains(point)) {
            return true;
        }

        const posNE = {
            x: point.x - this.canvasSize.width,
            y: point.y,
        };

        if (super.contains(posNE)) {
            return true;
        }

        const posSE = {
            x: point.x - this.canvasSize.width,
            y: point.y - this.canvasSize.height,
        };

        if (super.contains(posSE)) {
            return true;
        }

        const posSW = {
            x: point.x,
            y: point.y - this.canvasSize.height,
        };

        return super.contains(posSW);
    }

    public intersects(range: Range): boolean {
        if (super.intersects(range)) {
            return true;
        }

        const rect = range as Rectangle;
        const circle = range as Circle;

        const newPos = {
            x: range.position.x - this.canvasSize.width,
            y: range.position.y - this.canvasSize.height,
        };

        if (circle.radius !== undefined) {
            const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * 2);

            return super.intersects(biggerCircle);
        } else if (rect.size !== undefined) {
            const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);

            return super.intersects(rectSW);
        }

        return false;
    }
}
