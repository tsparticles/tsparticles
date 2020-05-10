import type { Particle } from "../Core/Particle";
import type { Range } from "./Range";
import type { Point } from "./Point";
import { Rectangle } from "./Rectangle";

export class QuadTree {
    public readonly rectangle: Rectangle;
    public readonly capacity: number;
    public readonly points: Point[];

    private northEast?: QuadTree;
    private northWest?: QuadTree;
    private southEast?: QuadTree;
    private southWest?: QuadTree;

    private divided: boolean;

    constructor(rectangle: Rectangle, capacity: number) {
        this.rectangle = rectangle;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    public subdivide(): void {
        const x = this.rectangle.position.x;
        const y = this.rectangle.position.y;
        const w = this.rectangle.size.width;
        const h = this.rectangle.size.height;

        this.northEast = new QuadTree(new Rectangle(x, y, w / 2, h / 2), this.capacity);
        this.northWest = new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2), this.capacity);
        this.southEast = new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2), this.capacity);
        this.southWest = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), this.capacity);
        this.divided = true;
    }

    public insert(point: Point): boolean {
        if (!this.rectangle.contains(point.position)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }
        }

        if (this.northEast?.insert(point)) {
            return true;
        } else if (this.northWest?.insert(point)) {
            return true;
        } else if (this.southEast?.insert(point)) {
            return true;
        } else if (this.southWest?.insert(point)) {
            return true;
        }

        return false;
    }

    public query(range: Range, found?: Particle[]): Particle[] {
        const res = found ?? [];

        if (!range.intersects(this.rectangle)) {
            return [];
        } else {
            for (let p of this.points) {
                if (range.contains(p.position)) {
                    res.push(p.particle);
                }
            }
            if (this.divided) {
                this.northEast?.query(range, res);
                this.northWest?.query(range, res);
                this.southEast?.query(range, res);
                this.southWest?.query(range, res);
            }
        }

        return res;
    }
}
