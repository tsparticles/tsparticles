import { Circle } from "./Circle";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IDimension } from "../Interfaces/IDimension";
import type { Particle } from "../Particle";
import type { Point } from "./Point";
import type { Range } from "./Range";
import { Rectangle } from "./Rectangle";
import { getDistance } from "../../Utils/NumberUtils";

/**
 */
export class QuadTree {
    /**
     * Used to know if the current instance is divided or not (branch or leaf)
     * @internal
     */
    private _divided;

    /**
     * The point contained in this instance
     */
    private readonly _points: Point[];

    private readonly _subs: QuadTree[];

    /**
     * Initializes the instance with a rectangle and a capacity
     * @param rectangle - the instance rectangle area
     * @param capacity - the points capacity
     */
    constructor(readonly rectangle: Rectangle, readonly capacity: number) {
        this._points = [];
        this._divided = false;
        this._subs = [];
    }

    /*draw(context: CanvasRenderingContext2D): void {
        context.strokeStyle = "#fff";
        context.lineWidth = 1;
        context.strokeRect(
            this.rectangle.position.x,
            this.rectangle.position.y,
            this.rectangle.size.width,
            this.rectangle.size.height
        );

        if (this._divided) {
            for (const sub of this._subs) {
                sub.draw(context);
            }
        }
    }*/

    /**
     * Inserts the given point in the instance, or to its subtrees
     * @param point - the point to insert
     * @returns true if the point is added to the instance or one of its subtrees, false if it's not
     */
    insert(point: Point): boolean {
        if (!this.rectangle.contains(point.position)) {
            return false;
        }

        if (this._points.length < this.capacity) {
            this._points.push(point);

            return true;
        }

        if (!this._divided) {
            this._subdivide();
        }

        return this._subs.some((sub) => sub.insert(point));
    }

    /**
     * Queries the instance using a {@link Rectangle} object, with the given position and the given size
     * @param range - the range to use for querying the tree
     * @param check - the function to check if the particle can be added to the result
     * @param found - found particles array, output parameter
     * @returns the particles inside the given range
     */
    query(range: Range, check?: (particle: Particle) => boolean, found?: Particle[]): Particle[] {
        const res = found || [];

        if (!range.intersects(this.rectangle)) {
            return [];
        }

        for (const p of this._points) {
            if (
                !range.contains(p.position) &&
                getDistance(range.position, p.position) > p.particle.getRadius() &&
                (!check || check(p.particle))
            ) {
                continue;
            }

            res.push(p.particle);
        }

        if (this._divided) {
            for (const sub of this._subs) {
                sub.query(range, check, res);
            }
        }

        return res;
    }

    /**
     * Queries the instance using a {@link Circle} object, with the given position and the given radius
     * @param position - the circle position
     * @param radius - the circle radius
     * @param check - the function to check if the particle can be added to the result
     * @returns the particles inside the given circle
     */
    queryCircle(position: ICoordinates, radius: number, check?: (particle: Particle) => boolean): Particle[] {
        return this.query(new Circle(position.x, position.y, radius), check);
    }

    /**
     * Queries the instance using a {@link Rectangle} object, with the given position and the given size
     * @param position - the rectangle position
     * @param size - the rectangle size
     * @param check - the function to check if the particle can be added to the result
     * @returns the particles inside the given rectangle
     */
    queryRectangle(position: ICoordinates, size: IDimension, check?: (particle: Particle) => boolean): Particle[] {
        return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
    }

    /**
     * Creates the subtrees, making the instance a branch
     */
    private _subdivide(): void {
        const { x, y } = this.rectangle.position,
            { width, height } = this.rectangle.size,
            { capacity } = this;

        for (let i = 0; i < 4; i++) {
            this._subs.push(
                new QuadTree(
                    new Rectangle(
                        x + (width / 2) * (i % 2),
                        y + (height / 2) * (Math.round(i / 2) - (i % 2)),
                        width / 2,
                        height / 2
                    ),
                    capacity
                )
            );
        }

        this._divided = true;
    }
}
