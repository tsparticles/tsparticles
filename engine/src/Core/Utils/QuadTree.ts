import { Circle } from "./Circle";
import { CircleWarp } from "./CircleWarp";
import type { Container } from "../Container";
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
     * The point contained in this instance
     */
    readonly points: Point[];

    /**
     * The NE subtree
     * @private
     */
    private northEast?: QuadTree;

    /**
     * the NW subtree
     * @private
     */
    private northWest?: QuadTree;

    /**
     * the SE subtree
     * @private
     */
    private southEast?: QuadTree;

    /**
     * the SW subtree
     * @private
     */
    private southWest?: QuadTree;

    /**
     * Used to know if the current instance is divided or not (branch or leaf)
     * @private
     */
    private divided;

    /**
     * Initializes the instance with a rectangle and a capacity
     * @param rectangle the instance rectangle area
     * @param capacity the points capacity
     */
    constructor(readonly rectangle: Rectangle, readonly capacity: number) {
        this.points = [];
        this.divided = false;
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

        if (this.points.length < this.capacity) {
            this.points.push(point);

            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        return (
            (this.northEast?.insert(point) ||
                this.northWest?.insert(point) ||
                this.southEast?.insert(point) ||
                this.southWest?.insert(point)) ??
            false
        );
    }

    /**
     * Queries the instance using a [[Circle]] object, with the given position and the given radius
     * @param position the circle position
     * @param radius the circle radius
     * @returns the particles inside the given circle
     */
    queryCircle(position: ICoordinates, radius: number): Particle[] {
        return this.query(new Circle(position.x, position.y, radius));
    }

    /**
     * Queries the instance using a [[CircleWarp]] object, with the given position and the given radius
     * @param position the circle position
     * @param radius the circle radius
     * @param containerOrSize the container canvas size
     * @returns the particles inside the given circle
     */
    queryCircleWarp(position: ICoordinates, radius: number, containerOrSize: Container | IDimension): Particle[] {
        const container = containerOrSize as Container,
            size = containerOrSize as IDimension;

        return this.query(
            new CircleWarp(
                position.x,
                position.y,
                radius,
                container.canvas !== undefined ? container.canvas.size : size
            )
        );
    }

    /**
     * Queries the instance using a [[Rectangle]] object, with the given position and the given size
     * @param position the rectangle position
     * @param size the rectangle size
     * @returns the particles inside the given rectangle
     */
    queryRectangle(position: ICoordinates, size: IDimension): Particle[] {
        return this.query(new Rectangle(position.x, position.y, size.width, size.height));
    }

    /**
     * Queries the instance using a [[Rectangle]] object, with the given position and the given size
     * @param range the range to use for querying the tree
     * @param found found particles array, output parameter
     * @returns the particles inside the given range
     */
    query(range: Range, found?: Particle[]): Particle[] {
        const res = found ?? [];

        if (!range.intersects(this.rectangle)) {
            return [];
        }

        for (const p of this.points) {
            if (!range.contains(p.position) && getDistance(range.position, p.position) > p.particle.getRadius()) {
                continue;
            }

            res.push(p.particle);
        }

        if (this.divided) {
            this.northEast?.query(range, res);
            this.northWest?.query(range, res);
            this.southEast?.query(range, res);
            this.southWest?.query(range, res);
        }

        return res;
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

        this.northEast = new QuadTree(new Rectangle(x, y, w / 2, h / 2), capacity);
        this.northWest = new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
        this.southEast = new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
        this.southWest = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
        this.divided = true;
    }
}
