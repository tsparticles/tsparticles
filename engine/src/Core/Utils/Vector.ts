import type { ICoordinates } from "../Interfaces";

export class Vector implements ICoordinates {
    static clone(source: Vector): Vector {
        return Vector.create(source.x, source.y);
    }

    static create(x: number | ICoordinates, y?: number): Vector {
        return new Vector(x, y);
    }

    static get origin(): Vector {
        return Vector.create(0, 0);
    }

    get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    set angle(angle: number) {
        this.updateFromAngle(angle, this.length);
    }

    get length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    set length(length: number) {
        this.updateFromAngle(this.angle, length);
    }

    x;
    y;

    protected constructor(x: number | ICoordinates, y?: number) {
        let defX: number, defY: number;

        if (y === undefined) {
            if (typeof x === "number") {
                throw new Error("tsParticles - Vector not initialized correctly");
            }

            const coords = x as ICoordinates;

            [defX, defY] = [coords.x, coords.y];
        } else {
            [defX, defY] = [x as number, y];
        }

        this.x = defX;
        this.y = defY;
    }

    add(v: Vector): Vector {
        return Vector.create(this.x + v.x, this.y + v.y);
    }

    addTo(v: Vector): void {
        this.x += v.x;
        this.y += v.y;
    }

    sub(v: Vector): Vector {
        return Vector.create(this.x - v.x, this.y - v.y);
    }

    subFrom(v: Vector): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    mult(n: number): Vector {
        return Vector.create(this.x * n, this.y * n);
    }

    multTo(n: number): void {
        this.x *= n;
        this.y *= n;
    }

    div(n: number): Vector {
        return Vector.create(this.x / n, this.y / n);
    }

    divTo(n: number): void {
        this.x /= n;
        this.y /= n;
    }

    distanceTo(v: Vector): number {
        return this.sub(v).length;
    }

    getLengthSq(): number {
        return this.x ** 2 + this.y ** 2;
    }

    distanceToSq(v: Vector): number {
        return this.sub(v).getLengthSq();
    }

    manhattanDistanceTo(v: Vector): number {
        return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
    }

    copy(): Vector {
        return Vector.clone(this);
    }

    setTo(velocity: Vector): void {
        this.x = velocity.x;
        this.y = velocity.y;
    }

    rotate(angle: number): Vector {
        return Vector.create(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }

    private updateFromAngle(angle: number, length: number) {
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
}
