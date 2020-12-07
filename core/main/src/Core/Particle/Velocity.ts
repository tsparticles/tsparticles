export class Velocity {
    public get angle(): number {
        return Math.atan2(this.vertical, this.horizontal);
    }

    public set angle(angle: number) {
        const length = this.length;

        this.horizontal = Math.cos(angle) * length;
        this.vertical = Math.sin(angle) * length;
    }

    public get length(): number {
        return Math.sqrt(this.horizontal ** 2 + this.vertical ** 2);
    }

    public set length(length: number) {
        const angle = this.angle;

        this.horizontal = Math.cos(angle) * length;
        this.vertical = Math.sin(angle) * length;
    }

    constructor(public horizontal: number, public vertical: number) {
    }

    public add(v: Velocity): Velocity {
        return new Velocity(this.horizontal + v.horizontal, this.vertical + v.vertical);
    }

    public addTo(v: Velocity): void {
        this.horizontal += v.horizontal;
        this.vertical += v.vertical;
    }

    public sub(v: Velocity): Velocity {
        return new Velocity(this.horizontal - v.horizontal, this.vertical - v.vertical);
    }

    public subFrom(v: Velocity): void {
        this.horizontal -= v.horizontal;
        this.vertical -= v.vertical;
    }

    public mult(n: number): Velocity {
        return new Velocity(this.horizontal * n, this.vertical * n);
    }

    public multTo(n: number): void {
        this.horizontal *= n;
        this.vertical *= n;
    }

    public div(n: number): Velocity {
        return new Velocity(this.horizontal / n, this.vertical / n);
    }

    public divTo(n: number): void {
        this.horizontal /= n;
        this.vertical /= n;
    }

    public distanceTo(v: Velocity): number {
        return this.sub(v).length;
    }

    public getLengthSq(): number {
        return this.horizontal ** 2 + this.vertical ** 2;
    }

    public distanceToSq(v: Velocity): number {
        return this.sub(v).getLengthSq();
    }

    public manhattanDistanceTo(v: Velocity): number {
        return Math.abs(v.horizontal - this.horizontal) + Math.abs(v.vertical - this.vertical);
    }

    public copy(): Velocity {
        return new Velocity(this.horizontal, this.vertical);
    }

    public setTo(velocity: Velocity): void {
        this.horizontal = velocity.horizontal;
        this.vertical = velocity.vertical;
    }

    public rotate(angle: number): Velocity {
        return new Velocity(
            this.horizontal * Math.cos(angle) - this.vertical * Math.sin(angle),
            this.horizontal * Math.sin(angle) + this.vertical * Math.cos(angle)
        );
    }
}
