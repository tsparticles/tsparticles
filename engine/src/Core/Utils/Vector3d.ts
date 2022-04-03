import type { ICoordinates, ICoordinates3d } from "../Interfaces/ICoordinates";
import { Vector } from "./Vector";

/**
 * @category Utils
 */
export class Vector3d extends Vector implements ICoordinates3d {
    /**
     * Clones the given vector
     * @param source the vector to clone
     * @returns a new vector instance, created from the given one
     */
    static clone(source: Vector3d): Vector3d {
        return Vector3d.create(source.x, source.y, source.z);
    }

    /**
     * Creates a new vector instance
     * @param x X coordinate
     * @param y Y coordinate
     * @param z Z coordinate
     * @returns the new vector created
     */
    static create(x: number | ICoordinates3d, y?: number, z?: number): Vector3d {
        return new Vector3d(x, y, z);
    }

    /**
     * A new vector, with coordinates in the origin point
     */
    static get origin(): Vector3d {
        return Vector3d.create(0, 0, 0);
    }

    /**
     * Z coordinate
     */
    z;

    /**
     * Vector constructor, creating an instance with the given coordinates
     * @param xOrCoords X coordinate or the whole [[ICoordinates]] object
     * @param y Y coordinate
     * @param z Z coordinate
     * @protected
     */
    protected constructor(xOrCoords: number | ICoordinates3d, y?: number, z?: number) {
        super(xOrCoords, y);

        if (typeof xOrCoords !== "number" && xOrCoords) {
            this.z = xOrCoords.z;
        } else if (z !== undefined) {
            this.z = z;
        } else {
            throw new Error("tsParticles - Vector not initialized correctly");
        }
    }

    /**
     * Adds the current and the given vector together, without modifying them
     * @param v the vector used for the sum operation
     * @returns the sum vector
     */
    add(v: Vector): Vector {
        return v instanceof Vector3d ? Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
    }

    /**
     * Adds the given vector to the current one, modifying it
     * @param v the vector to add to the current one
     */
    addTo(v: Vector): void {
        super.addTo(v);

        if (v instanceof Vector3d) {
            this.z += v.z;
        }
    }

    /**
     * Subtracts the current and the given vector together, without modifying them
     * @param v the vector used for the subtract operation
     * @returns the subtracted vector
     */
    sub(v: Vector): Vector {
        return v instanceof Vector3d ? Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
    }

    /**
     * Subtracts the given vector from the current one, modifying it
     * @param v the vector to subtract from the current one
     */
    subFrom(v: Vector): void {
        super.subFrom(v);

        if (v instanceof Vector3d) {
            this.z -= v.z;
        }
    }

    /**
     * Multiplies the given scalar and the current vector together, without modifying it
     * @param n the scalar value to multiply to the vector
     * @returns the multiplied vector
     */
    mult(n: number): Vector {
        return Vector3d.create(this.x * n, this.y * n, this.z * n);
    }

    /**
     * Multiplies the given scalar to the current vector, modifying it
     * @param n the scalar value to multiply to the vector
     */
    multTo(n: number): void {
        super.multTo(n);

        this.z *= n;
    }

    /**
     * Divides the given scalar and the current vector together, without modifying it
     * @param n the scalar value to divide from the current vector
     */
    div(n: number): Vector {
        return Vector3d.create(this.x / n, this.y / n, this.z / n);
    }

    /**
     * Divides the given scalar from the current vector, modifying it
     * @param n the scalar value to divide from the current vector
     */
    divTo(n: number): void {
        super.divTo(n);

        this.z /= n;
    }

    /**
     * Copies the current vector, cloning it
     * @returns the cloned current vector
     */
    copy(): Vector3d {
        return Vector3d.clone(this);
    }

    /**
     * Set the vector to the specified velocity
     * @param v the Vector used to set the current vector
     */
    setTo(v: ICoordinates): void {
        super.setTo(v);

        const v3d = v as ICoordinates3d;

        if (v3d.z !== undefined) {
            this.z = v3d.z;
        }
    }
}
