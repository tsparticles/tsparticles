import { Circle, Rectangle } from "tsparticles-engine";
import type { ICoordinates, IDimension, Range } from "tsparticles-engine";

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

        const offsets = [
            [0, this.canvasSize.height],
            [this.canvasSize.width, 0],
            [this.canvasSize.width, this.canvasSize.height],
        ];

        for (const offset of offsets) {
            const pos = {
                x: point.x + offset[0],
                y: point.y + offset[1],
            };

            if (super.contains(pos)) {
                return true;
            }
        }

        return false;
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

        const newPos = {
            x: range.position.x - this.canvasSize.width,
            y: range.position.y - this.canvasSize.height,
        };

        if (range instanceof Circle) {
            const circle = new Circle(newPos.x, newPos.y, range.radius * 2);

            return super.intersects(circle);
        } else if (range instanceof Rectangle) {
            const rect = new Rectangle(newPos.x, newPos.y, range.size.width * 2, range.size.height * 2);

            return super.intersects(rect);
        }

        return false;
    }
}
