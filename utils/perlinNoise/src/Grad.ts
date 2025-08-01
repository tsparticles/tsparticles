export class Grad {
    readonly w;
    readonly x;
    readonly y;
    readonly z;

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    dot2(x: number, y: number): number {
        return this.x * x + this.y * y;
    }

    dot3(x: number, y: number, z: number): number {
        return this.dot2(x, y) + this.z * z;
    }

    dot4(x: number, y: number, z: number, w: number): number {
        return this.dot3(x, y, z) + this.w * w;
    }
}
