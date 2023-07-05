import type { ICoordinates } from "../Interfaces/ICoordinates";
import { Range } from "./Range";
import { Rectangle } from "./Rectangle";
import { getDistance } from "../../Utils/NumberUtils";

/**
 */
export class Circle extends Range {
    /**
     * Circle constructor, initialized position and radius
     * @param x - X coordinate of the position
     * @param y - Y coordinate of the position
     * @param radius - Circle's radius
     */
    constructor(x: number, y: number, readonly radius: number) {
        super(x, y);
    }

    /**
     * Check if the given point is inside the circle
     * @param point - the point to check
     * @returns true or false, checking if the given point is inside the circle
     */
    contains(point: ICoordinates): boolean {
        return getDistance(point, this.position) <= this.radius;
    }

    /**
     * Check if the given range intersects the circle
     * @param range - the range to check
     * @returns true or false, checking if the range is intersecting with the circle
     */
    intersects(range: Range): boolean {
        const pos1 = this.position,
            pos2 = range.position,
            distPos = { x: Math.abs(pos2.x - pos1.x), y: Math.abs(pos2.y - pos1.y) },
            r = this.radius;

        if (range instanceof Circle) {
            const rSum = r + range.radius,
                dist = Math.sqrt(distPos.x ** 2 + distPos.y ** 2);

            return rSum > dist;
        } else if (range instanceof Rectangle) {
            const { width, height } = range.size,
                edges = Math.pow(distPos.x - width, 2) + Math.pow(distPos.y - height, 2);

            return (
                edges <= r ** 2 ||
                (distPos.x <= r + width && distPos.y <= r + height) ||
                distPos.x <= width ||
                distPos.y <= height
            );
        }

        return false;
    }
}
