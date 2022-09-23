import type { ICoordinates } from "../Interfaces/ICoordinates";
import { Vector3d } from "./Vector3d";

/**
 * @category Utils
 */
export class Vector extends Vector3d {
    /**
     * Vector constructor, creating an instance with the given coordinates
     * @param xOrCoords X coordinate or the whole [[ICoordinates]] object
     * @param y Y coordinate
     * @protected
     */
    protected constructor(xOrCoords: number | ICoordinates, y?: number) {
        super(xOrCoords, y, 0);
    }

    /**
     * A new vector, with coordinates in the origin point
     */
    static get origin(): Vector {
        return Vector.create(0, 0);
    }

    /**
     * Clones the given vector
     * @param source the vector to clone
     * @returns a new vector instance, created from the given one
     */
    static clone(source: Vector): Vector {
        return Vector.create(source.x, source.y);
    }

    /**
     * Creates a new vector instance
     * @param x X coordinate
     * @param y Y coordinate
     * @returns the new vector created
     */
    static create(x: number | ICoordinates, y?: number): Vector {
        return new Vector(x, y);
    }
}
