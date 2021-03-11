import { Vector } from "./Vector";
import type { ICoordinates3d } from "../Interfaces";

export class Vector3d extends Vector implements ICoordinates3d {
    public static clone(source: Vector3d) {
        return Vector3d.create(source.x, source.y, source.z);
    }

    public static create(x: number | ICoordinates3d, y?: number, z?: number) {
        return new Vector3d(x, y, z);
    }

    public z;

    protected constructor(x: number | ICoordinates3d, y?: number, z?: number) {
        super(x, y);

        this.z = z === undefined ? (x as ICoordinates3d).z : z;
    }

    public add(v: Vector): Vector {
        return v instanceof Vector3d ? Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
    }

    public addTo(v: Vector): void {
        super.addTo(v);

        if (v instanceof Vector3d) {
            this.z += v.z;
        }
    }

    public sub(v: Vector): Vector {
        return v instanceof Vector3d ? Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
    }

    public subFrom(v: Vector): void {
        super.subFrom(v);

        if (v instanceof Vector3d) {
            this.z -= v.z;
        }
    }

    public mult(n: number): Vector {
        return Vector3d.create(this.x * n, this.y * n, this.z * n);
    }

    public multTo(n: number): void {
        super.multTo(n);

        this.z *= n;
    }

    public div(n: number): Vector {
        return Vector3d.create(this.x / n, this.y / n, this.z / n);
    }

    public divTo(n: number): void {
        super.divTo(n);

        this.z /= n;
    }

    public copy(): Vector3d {
        return Vector3d.clone(this);
    }

    public setTo(v: Vector): void {
        super.setTo(v);

        if (v instanceof Vector3d) {
            this.z = v.z;
        }
    }
}
