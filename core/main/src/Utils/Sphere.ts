import type { ICoordinates3d } from "../Core/Interfaces/ICoordinates";
import { Parallelepiped } from "./Parallelepiped";
import { Range3d } from "./Range3d";

/**
 * @category Utils
 */
export class Sphere extends Range3d {
    constructor(x: number, y: number, z: number, public readonly radius: number) {
        super(x, y, z);
    }

    public contains(point: ICoordinates3d): boolean {
        const d = Math.pow(point.x - this.position.x, 2) + Math.pow(point.y - this.position.y, 2);

        return d <= this.radius * this.radius;
    }

    public intersects(range: Range3d): boolean {
        const rect = range as Parallelepiped;
        const circle = range as Sphere;
        const pos1 = this.position;
        const pos2 = range.position;

        const xDist = Math.abs(pos2.x - pos1.x);
        const yDist = Math.abs(pos2.y - pos1.y);
        const r = this.radius;

        if (circle.radius !== undefined) {
            const rSum = r + circle.radius;
            const dist = Math.sqrt(xDist * xDist + yDist + yDist);

            return rSum > dist;
        } else if (rect.size !== undefined) {
            const w = rect.size.width;
            const h = rect.size.height;
            const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

            if (xDist > r + w || yDist > r + h) {
                return false;
            }

            if (xDist <= w || yDist <= h) {
                return true;
            }

            return edges <= r * r;
        }

        return false;
    }
}
