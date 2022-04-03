import type { ICoordinates } from "../Interfaces/ICoordinates";

/**
 * @category Utils
 */
export class Vector implements ICoordinates {
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

    /**
     * A new vector, with coordinates in the origin point
     */
    static get origin(): Vector {
        return Vector.create(0, 0);
    }

    /**
     * Returns the current vector angle, based on x,y values
     */
    get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Sets the x,y values using an angle, length must be greater than 0
     * @param angle the angle to set
     */
    set angle(angle: number) {
        this.updateFromAngle(angle, this.length);
    }

    /**
     * Returns the current vector length, based on x,y values
     */
    get length(): number {
        return Math.sqrt(this.getLengthSq());
    }

    /**
     * Sets the x,y values using the length
     * @param length the length to set
     */
    set length(length: number) {
        this.updateFromAngle(this.angle, length);
    }

    /**
     * X coordinate of the vector
     */
    x;

    /**
     * Y coordinate of the vector
     */
    y;

    /**
     * Vector constructor, creating an instance with the given coordinates
     * @param xOrCoords X coordinate or the whole [[ICoordinates]] object
     * @param y Y coordinate
     * @protected
     */
    protected constructor(xOrCoords: number | ICoordinates, y?: number) {
        if (typeof xOrCoords !== "number" && xOrCoords) {
            this.x = xOrCoords.x;
            this.y = xOrCoords.y;
        } else if (xOrCoords !== undefined && y !== undefined) {
            this.x = xOrCoords;
            this.y = y;
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
        return Vector.create(this.x + v.x, this.y + v.y);
    }

    /**
     * Adds the given vector to the current one, modifying it
     * @param v the vector to add to the current one
     */
    addTo(v: Vector): void {
        this.x += v.x;
        this.y += v.y;
    }

    /**
     * Subtracts the current and the given vector together, without modifying them
     * @param v the vector used for the subtract operation
     * @returns the subtracted vector
     */
    sub(v: Vector): Vector {
        return Vector.create(this.x - v.x, this.y - v.y);
    }

    /**
     * Subtracts the given vector from the current one, modifying it
     * @param v the vector to subtract from the current one
     */
    subFrom(v: Vector): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    /**
     * Multiplies the given scalar and the current vector together, without modifying it
     * @param n the scalar value to multiply to the vector
     * @returns the multiplied vector
     */
    mult(n: number): Vector {
        return Vector.create(this.x * n, this.y * n);
    }

    /**
     * Multiplies the given scalar to the current vector, modifying it
     * @param n the scalar value to multiply to the vector
     */
    multTo(n: number): void {
        this.x *= n;
        this.y *= n;
    }

    /**
     * Divides the given scalar and the current vector together, without modifying it
     * @param n the scalar value to divide from the current vector
     */
    div(n: number): Vector {
        return Vector.create(this.x / n, this.y / n);
    }

    /**
     * Divides the given scalar from the current vector, modifying it
     * @param n the scalar value to divide from the current vector
     */
    divTo(n: number): void {
        this.x /= n;
        this.y /= n;
    }

    /**
     * Calculates the distance between the current vector and the given one
     * @param v the vector used for calculating the distance from the current one
     * @returns the distance between the vectors
     */
    distanceTo(v: Vector): number {
        return this.sub(v).length;
    }

    /**
     * Get the squared length value
     * @returns the squared length value
     */
    getLengthSq(): number {
        return this.x ** 2 + this.y ** 2;
    }

    /**
     * Get the distance squared between two vectors
     * @param v the vector used for calculating the distance from the current one
     * @returns the distance squared between the vectors
     */
    distanceToSq(v: Vector): number {
        return this.sub(v).getLengthSq();
    }

    /**
     * Returns the Manhattan distance between all vectors
     * @param v the vector used for calculating the distance from the current one
     * @returns the Manhattan distance between the vectors
     */
    manhattanDistanceTo(v: Vector): number {
        return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
    }

    /**
     * Copies the current vector, cloning it
     * @returns the cloned current vector
     */
    copy(): Vector {
        return Vector.clone(this);
    }

    /**
     * Set the vector to the specified velocity
     * @param v the Vector used to set the current vector
     */
    setTo(v: ICoordinates): void {
        this.x = v.x;
        this.y = v.y;
    }

    /**
     * Creates a new vector, rotating the current one, without modifying it
     * @param angle the rotation angle
     */
    rotate(angle: number): Vector {
        return Vector.create(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }

    /**
     * Updates the current vector, using angle and length values, instead of x and y
     * @param angle the new angle
     * @param length the new length
     * @private
     */
    private updateFromAngle(angle: number, length: number): void {
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
}
