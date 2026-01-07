import { type BaseRange, Circle, type ICoordinates, type IDimension, Rectangle } from "@tsparticles/engine";

const double = 2;

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
    override contains(point: ICoordinates): boolean {
        const { width, height } = this.canvasSize,
            { x, y } = point;

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
    override intersects(range: BaseRange): boolean {
        if (super.intersects(range)) {
            return true;
        }

        const rect = range as Rectangle,
            circle = range as Circle,
            newPos = {
                x: range.position.x - this.canvasSize.width,
                y: range.position.y - this.canvasSize.height,
            };

        if (Object.hasOwn(circle, "radius")) {
            const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * double);

            return super.intersects(biggerCircle);
        } else if (Object.hasOwn(rect, "size")) {
            const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * double, rect.size.height * double);

            return super.intersects(rectSW);
        }

        return false;
    }
}
