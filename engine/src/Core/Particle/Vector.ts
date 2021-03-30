import type { ICoordinates } from "../Interfaces/ICoordinates";

export class Vector implements ICoordinates {
    public static clone(source: Vector): Vector {
        return Vector.create(source.x, source.y);
    }

    public static create(x: number | ICoordinates, y?: number): Vector {
        return new Vector(x, y);
    }

    public static readonly origin = Vector.create(0, 0);

    public get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    public set angle(angle: number) {
        this.updateFromAngle(angle, this.length);
    }

    public get length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    public set length(length: number) {
        this.updateFromAngle(this.angle, length);
    }

    public x;
    public y;

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

    public add(v: Vector): Vector {
        return Vector.create(this.x + v.x, this.y + v.y);
    }

    public addTo(v: Vector): void {
        this.x += v.x;
        this.y += v.y;
    }

    public sub(v: Vector): Vector {
        return Vector.create(this.x - v.x, this.y - v.y);
    }

    public subFrom(v: Vector): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    public mult(n: number): Vector {
        return Vector.create(this.x * n, this.y * n);
    }

    public multTo(n: number): void {
        this.x *= n;
        this.y *= n;
    }

    public div(n: number): Vector {
        return Vector.create(this.x / n, this.y / n);
    }

    public divTo(n: number): void {
        this.x /= n;
        this.y /= n;
    }

    public distanceTo(v: Vector): number {
        return this.sub(v).length;
    }

    public getLengthSq(): number {
        return this.x ** 2 + this.y ** 2;
    }

    public distanceToSq(v: Vector): number {
        return this.sub(v).getLengthSq();
    }

    public manhattanDistanceTo(v: Vector): number {
        return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
    }

    public copy(): Vector {
        return Vector.clone(this);
    }

    public setTo(velocity: Vector): void {
        this.x = velocity.x;
        this.y = velocity.y;
    }

    public rotate(angle: number): Vector {
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
