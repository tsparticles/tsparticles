import { Circle } from "./Circle";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IDimension } from "../Interfaces/IDimension";
import { Range } from "./Range";
import { Rectangle } from "./Rectangle";

/**
 * @category Utils
 */
export class CircleWarp extends Circle {
    /**
     * Circle constructor, initialized position and radius
     * @param x X coordinate of the position
     * @param y Y coordinate of the position
     * @param radius Circle's radius
     * @param canvasSize the canvas size, used for warp formulas
     */
    constructor(x: number, y: number, radius: number, private readonly canvasSize: IDimension) {
        super(x, y, radius);

        this.canvasSize = { ...canvasSize };
    }

    /**
     * Check if the given point is inside the circle
     * @param point the point to check
     * @returns true or false, checking if the given point is inside the circle
     */
    contains(point: ICoordinates): boolean {
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

    /**
     * Check if the given range intersects the circle
     * @param range the range to check
     * @returns true or false, checking if the range is intersecting with the circle
     */
    intersects(range: Range): boolean {
        if (super.intersects(range)) {
            return true;
        }

        const rect = range as Rectangle,
            circle = range as Circle,
            newPos = {
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
