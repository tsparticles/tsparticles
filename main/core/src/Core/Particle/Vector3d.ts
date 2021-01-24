import { Vector } from "./Vector";
import type { ICoordinates3d } from "../Interfaces/ICoordinates";

export class Vector3d extends Vector implements ICoordinates3d {
    constructor(x: number, y: number, public z: number) {
        super(x, y);
    }

    public add(v: Vector): Vector {
        return v instanceof Vector3d ? new Vector3d(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
    }

    public addTo(v: Vector): void {
        super.addTo(v);

        if (v instanceof Vector3d) {
            this.z += v.z;
        }
    }

    public sub(v: Vector): Vector {
        return v instanceof Vector3d ? new Vector3d(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
    }

    public subFrom(v: Vector): void {
        super.subFrom(v);

        if (v instanceof Vector3d) {
            this.z -= v.z;
        }
    }

    public mult(n: number): Vector {
        return new Vector3d(this.x * n, this.y * n, this.z * n);
    }

    public multTo(n: number): void {
        super.multTo(n);

        this.z *= n;
    }

    public div(n: number): Vector {
        return new Vector3d(this.x / n, this.y / n, this.z / n);
    }

    public divTo(n: number): void {
        super.divTo(n);

        this.z /= n;
    }

    public copy(): Vector3d {
        return new Vector3d(this.x, this.y, this.z);
    }

    public setTo(v: Vector): void {
        super.setTo(v);

        if (v instanceof Vector3d) {
            this.z = v.z;
        }
    }
}
