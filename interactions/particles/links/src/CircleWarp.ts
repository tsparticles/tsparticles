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
     * @param offsets warp offsets for looking around the center
     */
    constructor(
        x: number,
        y: number,
        radius: number,
        private readonly canvasSize: IDimension,
        private readonly offsets: ICoordinates[]
    ) {
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

        for (const offset of this.offsets) {
            const pos = {
                x: point.x + offset.x,
                y: point.y + offset.y,
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
