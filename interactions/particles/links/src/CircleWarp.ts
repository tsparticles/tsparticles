import { Circle, type ICoordinates, type IDimension, type Range, Rectangle } from "@tsparticles/engine";

/**
 */
export class CircleWarp extends Circle {
    /**
     * Circle constructor, initialized position and radius
     * @param x - X coordinate of the position
     * @param y - Y coordinate of the position
     * @param radius - Circle's radius
     * @param canvasSize - the canvas size, used for warp formulas
     */
    constructor(
        x: number,
        y: number,
        radius: number,
        private readonly canvasSize: IDimension,
    ) {
        super(x, y, radius);

        this.canvasSize = { ...canvasSize };
    }

    /**
     * Check if the given point is inside the circle
     * @param point - the point to check
     * @returns true or false, checking if the given point is inside the circle
     */
    contains(point: ICoordinates): boolean {
        const { width, height } = this.canvasSize;
        const { x, y } = point;

        return (
            super.contains(point) ||
            super.contains({ x: x - width, y }) ||
            super.contains({ x: x - width, y: y - height }) ||
            super.contains({ x, y: y - height })
        );
    }

    /**
     * Check if the given range intersects the circle
     * @param range - the range to check
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
