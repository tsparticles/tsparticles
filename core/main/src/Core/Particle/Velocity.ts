import type { IVelocity } from "../Interfaces/IVelocity";

export class Velocity implements IVelocity {
    public horizontal: number;
    public vertical: number;

    public constructor() {
        this.horizontal = 0;
        this.vertical = 0;
    }

    public get angle(): number {
        return Math.atan2(this.vertical, this.horizontal);
    }

    public set angle(value: number) {
        this.horizontal = Math.cos(value);
        this.vertical = Math.sin(value);
    }
}
