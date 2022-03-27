import type { ICoordinates } from "../Interfaces";

/**
 * @category Utils
 */
export abstract class Range {
    /**
     * Range position
     */
    readonly position: ICoordinates;

    /**
     * Range constructor, initializes the position
     * @param x X coordinate of the position
     * @param y Y coordinate of the position
     * @protected
     */
    protected constructor(x: number, y: number) {
        this.position = {
            x: x,
            y: y,
        };
    }

    /**
     * Check if the point is inside the range
     * @param point the point to check in the range
     */
    abstract contains(point: ICoordinates): boolean;

    /**
     * Check if another range intersects with the current one
     * @param range the range to check the intersection with
     */
    abstract intersects(range: Range): boolean;
}
