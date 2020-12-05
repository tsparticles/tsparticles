export class Velocity {
    constructor(public horizontal: number, public vertical: number) {}

    public add(v: Velocity) {
        return new Velocity(this.horizontal + v.horizontal, this.vertical + v.vertical);
    }

    public addTo(v: Velocity) {
        this.horizontal += v.horizontal;
        this.vertical += v.vertical;
    }

    public sub(v: Velocity) {
        return new Velocity(this.horizontal - v.horizontal, this.vertical - v.vertical);
    }

    public subFrom(v: Velocity) {
        this.horizontal -= v.horizontal;
        this.vertical -= v.vertical;
    }

    public mult(n: number) {
        return new Velocity(this.horizontal * n, this.vertical * n);
    }

    public multTo(n: number) {
        this.horizontal *= n;
        this.vertical *= n;
        return this;
    }

    public div(n: number) {
        return new Velocity(this.horizontal / n, this.vertical / n);
    }

    public divTo(n: number) {
        this.horizontal /= n;
        this.vertical /= n;
    }

    public get angle(): number {
        return Math.atan2(this.vertical, this.horizontal);
    }

    public set angle(angle: number) {
        const length = this.length;

        this.horizontal = Math.cos(angle) * length;
        this.vertical = Math.sin(angle) * length;
    }

    public get length(): number {
        return Math.sqrt(this.horizontal * this.horizontal + this.vertical * this.vertical);
    }

    public set length(length: number) {
        const angle = this.angle;

        this.horizontal = Math.cos(angle) * length;
        this.vertical = Math.sin(angle) * length;
    }

    public distanceTo(v: Velocity) {
        return this.sub(v).length;
    }

    public getLengthSq() {
        return this.horizontal * this.horizontal + this.vertical * this.vertical;
    }

    public distanceToSq(v: Velocity) {
        return this.sub(v).getLengthSq();
    }

    public manhattanDistanceTo(v: Velocity) {
        return Math.abs(v.horizontal - this.horizontal) + Math.abs(v.vertical - this.vertical);
    }

    public copy() {
        return new Velocity(this.horizontal, this.vertical);
    }

    public rotate(angle: number) {
        return new Velocity(
            this.horizontal * Math.cos(angle) - this.vertical * Math.sin(angle),
            this.horizontal * Math.sin(angle) + this.vertical * Math.cos(angle)
        );
    }
}
