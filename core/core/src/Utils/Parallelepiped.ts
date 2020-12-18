import type { IDimension3d } from "../Core/Interfaces/IDimension";
import type { ICoordinates3d } from "../Core/Interfaces/ICoordinates";
import type { Sphere } from "./Sphere";
import { Range3d } from "./Range3d";

/**
 * @category Utils
 */
export class Parallelepiped extends Range3d {
    public readonly size: IDimension3d;

    constructor(x: number, y: number, z: number, width: number, height: number, depth: number) {
        super(x, y, z);

        this.size = {
            height: height,
            width: width,
            depth: depth,
        };
    }

    public contains(point: ICoordinates3d): boolean {
        const w = this.size.width;
        const h = this.size.height;
        const pos = this.position;

        return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
    }

    public intersects(range: Range3d): boolean {
        const parallelepiped = range as Parallelepiped;
        const sphere = range as Sphere;
        const w = this.size.width;
        const h = this.size.height;
        const d = this.size.depth;
        const pos1 = this.position;
        const pos2 = range.position;

        if (sphere.radius !== undefined) {
            return sphere.intersects(this);
        } else if (parallelepiped.size !== undefined) {
            const size2 = parallelepiped.size;
            const w2 = size2.width;
            const h2 = size2.height;
            const d2 = size2.depth;

            return (
                pos2.x < pos1.x + w &&
                pos2.x + w2 > pos1.x &&
                pos2.y < pos1.y + h &&
                pos2.y + h2 > pos1.y &&
                pos2.z < pos1.z + d &&
                pos2.z + d2 > pos1.z
            );
        }

        return false;
    }
}
