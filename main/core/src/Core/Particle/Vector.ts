import type { ICoordinates } from "../Interfaces/ICoordinates";

export class Vector implements ICoordinates {
    public get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    public set angle(angle: number) {
        const length = this.length;

        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    public get length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    public set length(length: number) {
        const angle = this.angle;

        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    constructor(public x: number, public y: number) {}

    public add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    public addTo(v: Vector): void {
        this.x += v.x;
        this.y += v.y;
    }

    public sub(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    public subFrom(v: Vector): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    public mult(n: number): Vector {
        return new Vector(this.x * n, this.y * n);
    }

    public multTo(n: number): void {
        this.x *= n;
        this.y *= n;
    }

    public div(n: number): Vector {
        return new Vector(this.x / n, this.y / n);
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
        return new Vector(this.x, this.y);
    }

    public setTo(velocity: Vector): void {
        this.x = velocity.x;
        this.y = velocity.y;
    }

    public rotate(angle: number): Vector {
        return new Vector(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }
}
