import { Range } from "./Range";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { Circle } from "./Circle";

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
        return (
            point.x >= this.position.x &&
            point.x <= this.position.x + this.size.width &&
            point.y >= this.position.y &&
            point.y <= this.position.y + this.size.height
        );
    }

    public intersects(range: Range): boolean {
        const rect = range as Rectangle;
        const circle = range as Circle;
        const w = this.size.width;
        const h = this.size.height;
        const pos1 = this.position;
        const pos2 = range.position;

        if (circle.radius !== undefined) {
            return circle.intersects(this);
        } else if (rect.size !== undefined) {
            const size2 = rect.size;
            const w2 = size2.width;
            const h2 = size2.height;

            return (
                pos2.x - w2 < pos1.x + w &&
                pos2.x + w2 > pos1.x - w &&
                pos2.y - h2 < pos1.y + h &&
                pos2.y + h2 > pos1.y - h
            );
        }

        return false;
    }
}
