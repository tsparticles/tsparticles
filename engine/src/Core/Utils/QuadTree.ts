import { Circle } from "./Circle";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { IDimension } from "../Interfaces/IDimension";
import type { Particle } from "../Particle";
import type { Point } from "./Point";
import type { Range } from "./Range";
import { Rectangle } from "./Rectangle";
import { getDistance } from "../../Utils/NumberUtils";

/**
 * @category Utils
 */
export class QuadTree {
    /**
     * The North East subtree
     * @private
     */
    private _NE?: QuadTree;

    /**
     * the North West subtree
     * @private
     */
    private _NW?: QuadTree;

    /**
     * the South East subtree
     * @private
     */
    private _SE?: QuadTree;

    /**
     * the South West subtree
     * @private
     */
    private _SW?: QuadTree;

    /**
     * Used to know if the current instance is divided or not (branch or leaf)
     * @private
     */
    private _divided;

    /**
     * The point contained in this instance
     */
    private readonly _points: Point[];

    /**
     * Initializes the instance with a rectangle and a capacity
     * @param rectangle the instance rectangle area
     * @param capacity the points capacity
     */
    constructor(readonly rectangle: Rectangle, readonly capacity: number) {
        this._points = [];
        this._divided = false;
    }

    /**
     * Inserts the given point in the instance, or to its subtrees
     * @param point the point to insert
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
            this.subdivide();
        }

        return (
            (this._NE?.insert(point) ||
                this._NW?.insert(point) ||
                this._SE?.insert(point) ||
                this._SW?.insert(point)) ??
            false
        );
    }

    /**
     * Queries the instance using a [[Rectangle]] object, with the given position and the given size
     * @param range the range to use for querying the tree
     * @param check the function to check if the particle can be added to the result
     * @param found found particles array, output parameter
     * @returns the particles inside the given range
     */
    query(range: Range, check?: (particle: Particle) => boolean, found?: Particle[]): Particle[] {
        const res = found ?? [];

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
            this._NE?.query(range, check, res);
            this._NW?.query(range, check, res);
            this._SE?.query(range, check, res);
            this._SW?.query(range, check, res);
        }

        return res;
    }

    /**
     * Queries the instance using a [[Circle]] object, with the given position and the given radius
     * @param position the circle position
     * @param radius the circle radius
     * @param check the function to check if the particle can be added to the result
     * @returns the particles inside the given circle
     */
    queryCircle(position: ICoordinates, radius: number, check?: (particle: Particle) => boolean): Particle[] {
        return this.query(new Circle(position.x, position.y, radius), check);
    }

    /**
     * Queries the instance using a [[Rectangle]] object, with the given position and the given size
     * @param position the rectangle position
     * @param size the rectangle size
     * @param check the function to check if the particle can be added to the result
     * @returns the particles inside the given rectangle
     */
    queryRectangle(position: ICoordinates, size: IDimension, check?: (particle: Particle) => boolean): Particle[] {
        return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
    }

    /**
     * Creates the subtrees, making the instance a branch
     */
    private subdivide(): void {
        const x = this.rectangle.position.x,
            y = this.rectangle.position.y,
            w = this.rectangle.size.width,
            h = this.rectangle.size.height,
            capacity = this.capacity;

        this._NE = new QuadTree(new Rectangle(x, y, w / 2, h / 2), capacity);
        this._NW = new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
        this._SE = new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
        this._SW = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
        this._divided = true;
    }
}
