export class Grad {
    readonly x;
    readonly y;
    readonly z;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    dot2(x: number, y: number): number {
        return this.x * x + this.y * y;
    }

    dot3(x: number, y: number, z: number): number {
        return this.dot2(x, y) + this.z * z;
    }
}
