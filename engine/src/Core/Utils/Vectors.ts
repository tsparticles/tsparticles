import type { ICoordinates, ICoordinates3d } from "../Interfaces/ICoordinates.js";
import { errorPrefix, inverseFactorNumerator, none, origin, squareExp } from "./Constants.js";
import { isNumber } from "../../Utils/TypeUtils.js";

/**
 */
export class Vector3d implements ICoordinates3d {
    /**
     * X coordinate of the vector
     */
    x;

    /**
     * Y coordinate of the vector
     */
    y;

    /**
     * Z coordinate
     */
    z;

    /**
     * Vector3d constructor, creating an instance with the given coordinates
     * @param xOrCoords - X coordinate or the whole {@link ICoordinates} object
     * @param y - Y coordinate
     * @param z - Z coordinate
     * @internal
     */
    protected constructor(xOrCoords: number | ICoordinates3d | ICoordinates, y?: number, z?: number) {
        if (!isNumber(xOrCoords) && xOrCoords) {
            this.x = xOrCoords.x;
            this.y = xOrCoords.y;

            const coords3d = xOrCoords as ICoordinates3d;

            this.z = coords3d.z ? coords3d.z : origin.z;
        } else if (xOrCoords !== undefined && y !== undefined) {
            this.x = xOrCoords;
            this.y = y;
            this.z = z ?? origin.z;
        } else {
            throw new Error(`${errorPrefix} Vector3d not initialized correctly`);
        }
    }

    /**
     * A new vector, with coordinates in the origin point
     * @returns a new vector, with coordinates in the origin point
     */
    static get origin(): Vector3d {
        return Vector3d.create(origin.x, origin.y, origin.z);
    }

    /**
     * Returns the current vector angle, based on x,y values
     * @returns the current vector angle, based on x,y values
     */
    get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Sets the x,y values using an angle, length must be greater than 0
     * @param angle - the angle to set
     */
    set angle(angle: number) {
        this._updateFromAngle(angle, this.length);
    }

    /**
     * Returns the current vector length, based on x,y values
     * @returns the current vector length, based on x,y values
     */
    get length(): number {
        return Math.sqrt(this.getLengthSq());
    }

    /**
     * Sets the x,y values using the length
     * @param length - the length to set
     */
    set length(length: number) {
        this._updateFromAngle(this.angle, length);
    }

    /**
     * Clones the given vector
     * @param source - the vector to clone
     * @returns a new vector instance, created from the given one
     */
    static clone(source: Vector3d): Vector3d {
        return Vector3d.create(source.x, source.y, source.z);
    }

    /**
     * Creates a new vector instance
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param z - Z coordinate
     * @returns the new vector created
     */
    static create(x: number | ICoordinates3d, y?: number, z?: number): Vector3d {
        return new Vector3d(x, y, z);
    }

    /**
     * Adds the current and the given vector together, without modifying them
     * @param v - the vector used for the sum operation
     * @returns the sum vector
     */
    add(v: Vector3d): Vector3d {
        return Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    /**
     * Adds the given vector to the current one, modifying it
     * @param v - the vector to add to the current one
     */
    addTo(v: Vector3d): void {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    /**
     * Copies the current vector, cloning it
     * @returns the cloned current vector
     */
    copy(): Vector3d {
        return Vector3d.clone(this);
    }

    /**
     * Calculates the distance between the current vector and the given one
     * @param v - the vector used for calculating the distance from the current one
     * @returns the distance between the vectors
     */
    distanceTo(v: Vector3d): number {
        return this.sub(v).length;
    }

    /**
     * Get the distance squared between two vectors
     * @param v - the vector used for calculating the distance from the current one
     * @returns the distance squared between the vectors
     */
    distanceToSq(v: Vector3d): number {
        return this.sub(v).getLengthSq();
    }

    /**
     * Divides the given scalar and the current vector together, without modifying it
     * @param n - the scalar value to divide from the current vector
     * @returns the divided vector
     */
    div(n: number): Vector3d {
        return Vector3d.create(this.x / n, this.y / n, this.z / n);
    }

    /**
     * Divides the given scalar from the current vector, modifying it
     * @param n - the scalar value to divide from the current vector
     */
    divTo(n: number): void {
        this.x /= n;
        this.y /= n;
        this.z /= n;
    }

    /**
     * Get the squared length value
     * @returns the squared length value
     */
    getLengthSq(): number {
        return this.x ** squareExp + this.y ** squareExp;
    }

    /**
     * Multiplies the given scalar and the current vector together, without modifying it
     * @param n - the scalar value to multiply to the vector
     * @returns the multiplied vector
     */
    mult(n: number): Vector3d {
        return Vector3d.create(this.x * n, this.y * n, this.z * n);
    }

    /**
     * Multiplies the given scalar to the current vector, modifying it
     * @param n - the scalar value to multiply to the vector
     */
    multTo(n: number): void {
        this.x *= n;
        this.y *= n;
        this.z *= n;
    }

    /**
     * Normalizes the current vector, modifying it
     */
    normalize(): void {
        const length = this.length;

        if (length != none) {
            this.multTo(inverseFactorNumerator / length);
        }
    }

    /**
     * Creates a new vector, rotating the current one, without modifying it
     * @param angle - the rotation angle
     * @returns the rotated vector
     */
    rotate(angle: number): Vector3d {
        return Vector3d.create(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle),
            origin.z,
        );
    }

    /**
     * Set the vector to the specified velocity
     * @param c - the coordinates used to set the current vector
     */
    setTo(c: ICoordinates): void {
        this.x = c.x;
        this.y = c.y;

        const v3d = c as ICoordinates3d;

        this.z = v3d.z ? v3d.z : origin.z;
    }

    /**
     * Subtracts the current and the given vector together, without modifying them
     * @param v - the vector used for the subtract operation
     * @returns the subtracted vector
     */
    sub(v: Vector3d): Vector3d {
        return Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    /**
     * Subtracts the given vector from the current one, modifying it
     * @param v - the vector to subtract from the current one
     */
    subFrom(v: Vector3d): void {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }

    /**
     * Updates the current vector, using angle and length values, instead of x and y
     * @param angle - the new angle
     * @param length - the new length
     * @internal
     */
    private readonly _updateFromAngle: (angle: number, length: number) => void = (angle, length) => {
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    };
}

/**
 */
export class Vector extends Vector3d {
    /**
     * Vector constructor, creating an instance with the given coordinates
     * @param xOrCoords - X coordinate or the whole {@link ICoordinates} object
     * @param y - Y coordinate
     * @internal
     */
    protected constructor(xOrCoords: number | ICoordinates, y?: number) {
        super(xOrCoords, y, origin.z);
    }

    /**
     * A new vector, with coordinates in the origin point
     * @returns a new vector, with coordinates in the origin point
     */
    static get origin(): Vector {
        return Vector.create(origin.x, origin.y);
    }

    /**
     * Clones the given vector
     * @param source - the vector to clone
     * @returns a new vector instance, created from the given one
     */
    static clone(source: Vector): Vector {
        return Vector.create(source.x, source.y);
    }

    /**
     * Creates a new vector instance
     * @param x - X coordinate
     * @param y - Y coordinate
     * @returns the new vector created
     */
    static create(x: number | ICoordinates, y?: number): Vector {
        return new Vector(x, y);
    }
}
