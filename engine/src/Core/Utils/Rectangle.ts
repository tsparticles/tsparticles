import { Circle } from "./Circle";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IDimension } from "../Interfaces/IDimension";
import { Range } from "./Range";

/**
 * @category Utils
 */
export class Rectangle extends Range {
    /**
     * The rectangle size
     */
    readonly size: IDimension;

    /**
     * The rectangle constructor, initializes position and size
     * @param x X coordinate of the position
     * @param y Y coordinate of the position
     * @param width Rectangle width
     * @param height Rectangle height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y);

        this.size = {
            height: height,
            width: width,
        };
    }

    /**
     * Check if the given point is inside the rectangle
     * @param point the point to check
     * @returns true or false, checking if the given point is inside the rectangle
     */
    contains(point: ICoordinates): boolean {
        const w = this.size.width,
            h = this.size.height,
            pos = this.position;

        return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
    }

    /**
     * Check if another range intersects the rectangle
     * @param range the range to check
     * @returns true or false, checking if the range is intersecting with the rectangle
     */
    intersects(range: Range): boolean {
        const rect = range as Rectangle,
            circle = range as Circle,
            w = this.size.width,
            h = this.size.height,
            pos1 = this.position,
            pos2 = range.position;

        if (circle.radius !== undefined) {
            return circle.intersects(this);
        }

        if (!rect.size) {
            return false;
        }

        const size2 = rect.size,
            w2 = size2.width,
            h2 = size2.height;

        return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
    }
}
