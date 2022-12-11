import type { ICoordinates } from "../Interfaces/ICoordinates";
import { Range } from "./Range";
import type { Rectangle } from "./Rectangle";
import { getDistance } from "../../Utils/NumberUtils";

/**
 * @category Utils
 */
export class Circle extends Range {
    /**
     * Circle constructor, initialized position and radius
     * @param x X coordinate of the position
     * @param y Y coordinate of the position
     * @param radius Circle's radius
     */
    constructor(x: number, y: number, readonly radius: number) {
        super(x, y);
    }

    /**
     * Check if the given point is inside the circle
     * @param point the point to check
     * @returns true or false, checking if the given point is inside the circle
     */
    contains(point: ICoordinates): boolean {
        return getDistance(point, this.position) <= this.radius;
    }

    /**
     * Check if the given range intersects the circle
     * @param range the range to check
     * @returns true or false, checking if the range is intersecting with the circle
     */
    intersects(range: Range): boolean {
        const rect = range as Rectangle,
            circle = range as Circle,
            pos1 = this.position,
            pos2 = range.position,
            distPos = { x: Math.abs(pos2.x - pos1.x), y: Math.abs(pos2.y - pos1.y) },
            r = this.radius;

        if (circle.radius !== undefined) {
            const rSum = r + circle.radius,
                dist = Math.sqrt(distPos.x ** 2 + distPos.y ** 2);

            return rSum > dist;
        } else if (rect.size !== undefined) {
            const w = rect.size.width,
                h = rect.size.height,
                edges = Math.pow(distPos.x - w, 2) + Math.pow(distPos.y - h, 2);

            return edges <= r ** 2 || (distPos.x <= r + w && distPos.y <= r + h) || distPos.x <= w || distPos.y <= h;
        }

        return false;
    }
}
