import type { ICoordinates3d } from "../Core/Interfaces/ICoordinates";

/**
 * @category Utils
 */
export abstract class Range3d {
    readonly position: ICoordinates3d;

    protected constructor(x: number, y: number, z: number) {
        this.position = {
            x: x,
            y: y,
            z: z,
        };
    }

    public abstract contains(point: ICoordinates3d): boolean;

    public abstract intersects(range: Range3d): boolean;
}
