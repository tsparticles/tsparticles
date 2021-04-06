import type { ICoordinates3d } from "../Core/Interfaces";
import { Parallelepiped } from "./Parallelepiped";
import { Range3d } from "./Range3d";

/**
 * @category Utils
 */
export class Sphere extends Range3d {
    constructor(x: number, y: number, z: number, readonly radius: number) {
        super(x, y, z);
    }

    contains(point: ICoordinates3d): boolean {
        const d = Math.pow(point.x - this.position.x, 2) + Math.pow(point.y - this.position.y, 2);

        return d <= this.radius ** 2;
    }

    intersects(range: Range3d): boolean {
        const parallelepiped = range as Parallelepiped;
        const sphere = range as Sphere;
        const pos1 = this.position;
        const pos2 = range.position;

        const xDist = Math.abs(pos2.x - pos1.x);
        const yDist = Math.abs(pos2.y - pos1.y);
        const zDist = Math.abs(pos2.z - pos2.y);
        const r = this.radius;

        if (sphere.radius !== undefined) {
            const rSum = r + sphere.radius;
            const dist = Math.sqrt(xDist ** 2 + yDist ** 2 + zDist ** 2);

            return rSum > dist;
        } else if (parallelepiped.size !== undefined) {
            const w = parallelepiped.size.width;
            const h = parallelepiped.size.height;
            const d = parallelepiped.size.depth;
            const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2) + Math.pow(zDist - d, 2);

            if (xDist > r + w || yDist > r + h || zDist > r + d) {
                return false;
            }

            if (xDist <= w || yDist <= h || zDist <= d) {
                return true;
            }

            return edges <= r ** 2;
        }

        return false;
    }
}
