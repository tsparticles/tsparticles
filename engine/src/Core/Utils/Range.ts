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

    public abstract contains(point: ICoordinates): boolean;

    public abstract intersects(range: Range): boolean;
}
