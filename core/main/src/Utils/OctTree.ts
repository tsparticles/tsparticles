import type { Particle } from "../Core/Particle";
import type { ICoordinates3d } from "../Core/Interfaces/ICoordinates";
import type { IDimension3d } from "../Core/Interfaces/IDimension";
import { Parallelepiped } from "./Parallelepiped";
import { Point3d } from "./Point3d";
import { Range3d } from "./Range3d";
import { Sphere } from "./Sphere";

/**
 * @category Utils
 */
export class OctTree {
    public readonly points: Point3d[];

    private northEastFront?: OctTree;
    private northEastBack?: OctTree;
    private northWestFront?: OctTree;
    private northWestBack?: OctTree;
    private southEastFront?: OctTree;
    private southEastBack?: OctTree;
    private southWestFront?: OctTree;
    private southWestBack?: OctTree;

    private divided;

    constructor(public readonly parallelepiped: Parallelepiped, public readonly capacity: number) {
        this.points = [];
        this.divided = false;
    }

    public subdivide(): void {
        const x = this.parallelepiped.position.x;
        const y = this.parallelepiped.position.y;
        const z = this.parallelepiped.position.z;
        const w = this.parallelepiped.size.width;
        const h = this.parallelepiped.size.height;
        const d = this.parallelepiped.size.depth;
        const capacity = this.capacity;

        this.northEastFront = new OctTree(new Parallelepiped(x, y, z, w / 2, h / 2, d / 2), capacity);
        this.northEastBack = new OctTree(new Parallelepiped(x, y, z + d / 2, w / 2, h / 2, d / 2), capacity);
        this.northWestFront = new OctTree(new Parallelepiped(x + w / 2, y, z, w / 2, h / 2, d / 2), capacity);
        this.northWestBack = new OctTree(new Parallelepiped(x + w / 2, y, z + d / 2, w / 2, h / 2, d / 2), capacity);
        this.southEastFront = new OctTree(new Parallelepiped(x, y + h / 2, z, w / 2, h / 2, d / 2), capacity);
        this.southEastBack = new OctTree(new Parallelepiped(x, y + h / 2, z + d / 2, w / 2, h / 2, d / 2), capacity);
        this.southWestFront = new OctTree(new Parallelepiped(x + w / 2, y + h / 2, z, w / 2, h / 2, d / 2), capacity);
        this.southWestBack = new OctTree(
            new Parallelepiped(x + w / 2, y + h / 2, z + d / 2, w / 2, h / 2, d / 2),
            capacity
        );
        this.divided = true;
    }

    public insert(point: Point3d): boolean {
        if (!this.parallelepiped.contains(point.position)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);

            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        return (
            (this.northEastBack?.insert(point) ||
                this.northEastFront?.insert(point) ||
                this.northWestBack?.insert(point) ||
                this.northWestFront?.insert(point) ||
                this.southEastBack?.insert(point) ||
                this.southEastFront?.insert(point) ||
                this.southWestBack?.insert(point) ||
                this.southWestFront?.insert(point)) ??
            false
        );
    }

    public queryCircle(position: ICoordinates3d, radius: number): Particle[] {
        return this.query(new Sphere(position.x, position.y, position.z, radius));
    }

    /*public queryCircleWarp(
        position: ICoordinates3d,
        radius: number,
        containerOrSize: Container | IDimension3d
    ): Particle[] {
        const container = containerOrSize as Container;
        const size = containerOrSize as IDimension;

        return this.query(
            new CircleWarp(
                position.x,
                position.y,
                radius,
                container.canvas !== undefined ? container.canvas.size : size
            )
        );
    }*/

    public queryParallelepiped(position: ICoordinates3d, size: IDimension3d): Particle[] {
        return this.query(new Parallelepiped(position.x, position.y, position.z, size.width, size.height, size.depth));
    }

    public query(range: Range3d, found?: Particle[]): Particle[] {
        const res = found ?? [];

        if (!range.intersects(this.parallelepiped)) {
            return [];
        } else {
            for (const p of this.points) {
                if (!range.contains(p.position)) {
                    continue;
                }

                res.push(p.particle);
            }

            if (this.divided) {
                this.northEastBack?.query(range, res);
                this.northEastFront?.query(range, res);
                this.northWestBack?.query(range, res);
                this.northWestFront?.query(range, res);
                this.southEastBack?.query(range, res);
                this.southEastFront?.query(range, res);
                this.southWestBack?.query(range, res);
                this.southWestFront?.query(range, res);
            }
        }

        return res;
    }
}
