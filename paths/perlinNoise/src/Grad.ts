export class Grad {
    constructor(readonly x: number, readonly y: number, readonly z: number) {}

    dot2(x: number, y: number): number {
        return this.x * x + this.y * y;
    }

    dot3(x: number, y: number, z: number): number {
        return this.dot2(x, y) + this.z * z;
    }
}
