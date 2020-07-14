import { Range } from "./Range";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { Rectangle } from "./Rectangle";

export class Circle extends Range {
    constructor(x: number, y: number, public readonly radius: number) {
        super(x, y);
    }

    public contains(point: ICoordinates): boolean {
        const d = Math.pow(point.x - this.position.x, 2) + Math.pow(point.y - this.position.y, 2);

        return d <= this.radius * this.radius;
    }

    public intersects(range: Range): boolean {
        const rect = range as Rectangle;
        const circle = range as Circle;
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
