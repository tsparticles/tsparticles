import { Range } from "./Range";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { Rectangle } from "./Rectangle";

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
