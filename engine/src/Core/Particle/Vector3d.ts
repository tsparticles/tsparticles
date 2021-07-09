import { Vector } from "./Vector";
import type { ICoordinates3d } from "../Interfaces";

export class Vector3d extends Vector implements ICoordinates3d {
    static clone(source: Vector3d) {
        return Vector3d.create(source.x, source.y, source.z);
    }

    static create(x: number | ICoordinates3d, y?: number, z?: number) {
        return new Vector3d(x, y, z);
    }

    z;

    protected constructor(x: number | ICoordinates3d, y?: number, z?: number) {
        super(x, y);

        this.z = z === undefined ? (x as ICoordinates3d).z : z;
    }

    add(v: Vector): Vector {
        return v instanceof Vector3d ? Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
    }

    addTo(v: Vector): void {
        super.addTo(v);

        if (v instanceof Vector3d) {
            this.z += v.z;
        }
    }

    sub(v: Vector): Vector {
        return v instanceof Vector3d ? Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
    }

    subFrom(v: Vector): void {
        super.subFrom(v);

        if (v instanceof Vector3d) {
            this.z -= v.z;
        }
    }

    mult(n: number): Vector {
        return Vector3d.create(this.x * n, this.y * n, this.z * n);
    }

    multTo(n: number): void {
        super.multTo(n);

        this.z *= n;
    }

    div(n: number): Vector {
        return Vector3d.create(this.x / n, this.y / n, this.z / n);
    }

    divTo(n: number): void {
        super.divTo(n);

        this.z /= n;
    }

    copy(): Vector3d {
        return Vector3d.clone(this);
    }

    setTo(v: Vector): void {
        super.setTo(v);

        if (v instanceof Vector3d) {
            this.z = v.z;
        }
    }
}
