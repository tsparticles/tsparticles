import type { ICoordinates } from "../Interfaces";

/**
 * @category Utils
 */
export abstract class Range {
    readonly position: ICoordinates;

    protected constructor(x: number, y: number) {
        this.position = {
            x: x,
            y: y,
        };
    }

    abstract contains(point: ICoordinates): boolean;

    abstract intersects(range: Range): boolean;
}
