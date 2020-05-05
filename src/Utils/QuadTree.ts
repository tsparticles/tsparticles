import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { Particle } from "../Core/Particle";

export abstract class Range {
    public readonly position: ICoordinates;

    protected constructor(x: number, y: number) {
        this.position = {
            x: x,
            y: y,
        };
    }

    public abstract contains(point: ICoordinates): boolean;

    public abstract intersects(range: Rectangle): boolean;
}

export class Point {
    public readonly position: ICoordinates;
    public readonly particle: Particle;

    constructor(x: number, y: number, particle: Particle) {
        this.position = {
            x: x,
            y: y,
        };

        this.particle = particle;
    }
}

export class Circle extends Range {
    public readonly radius: number;

    constructor(x: number, y: number, radius: number) {
        super(x, y);

        this.radius = radius;
    }

    public contains(point: ICoordinates): boolean {
        let d = Math.pow((point.x - this.position.x), 2) + Math.pow((point.y - this.position.y), 2);

        return d <= this.radius * this.radius;
    }

    public intersects(range: Rectangle): boolean {
        const xDist = Math.abs(range.position.x - this.position.x);
        const yDist = Math.abs(range.position.y - this.position.y);
        const r = this.radius;
        const w = range.size.width;
        const h = range.size.height;
        const edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);

        if (xDist > (r + w) || yDist > (r + h)) {
            return false;
        }

        if (xDist <= w || yDist <= h) {
            return true;
        }

        return edges <= this.radius * this.radius;
    }
}

export class Rectangle extends Range {
    public readonly size: IDimension;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y);

        this.size = {
            height: height,
            width: width,
        };
    }

    public contains(point: ICoordinates): boolean {
        return (point.x >= this.position.x - this.size.width &&
            point.x < this.position.x + this.size.width &&
            point.y >= this.position.y - this.size.height &&
            point.y < this.position.y + this.size.height);
    }

    public intersects(range: Rectangle): boolean {
        return !(range.position.x - range.size.width > this.position.x + this.size.width ||
            range.position.x + range.size.width < this.position.x - this.size.width ||
            range.position.y - range.size.height > this.position.y + this.size.height ||
            range.position.y + range.size.height < this.position.y - this.size.height);
    }
}

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
        if (!found) {
            found = [];
        }
        if (!range.intersects(this.rectangle)) {
            return [];
        } else {
            for (let p of this.points) {
                if (range.contains(p.position)) {
                    found.push(p.particle);
                }
            }
            if (this.divided) {
                this.northEast?.query(range, found);
                this.northWest?.query(range, found);
                this.southEast?.query(range, found);
                this.southWest?.query(range, found);
            }
        }

        return found;
    }
}