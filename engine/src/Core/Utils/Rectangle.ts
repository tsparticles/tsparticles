import type { ICoordinates, IDimension } from "../Interfaces";
import { Circle } from "./Circle";
import { Range } from "./Range";

/**
 * @category Utils
 */
export class Rectangle extends Range {
    readonly size: IDimension;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y);

        this.size = {
            height: height,
            width: width,
        };
    }

    contains(point: ICoordinates): boolean {
        const w = this.size.width,
            h = this.size.height,
            pos = this.position;

        return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
    }

    intersects(range: Range): boolean {
        const rect = range as Rectangle,
            circle = range as Circle,
            w = this.size.width,
            h = this.size.height,
            pos1 = this.position,
            pos2 = range.position;

        if (circle.radius !== undefined) {
            return circle.intersects(this);
        }

        if (!rect.size) {
            return false;
        }

        const size2 = rect.size,
            w2 = size2.width,
            h2 = size2.height;

        return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
    }
}
