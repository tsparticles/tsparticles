import { Range } from "./Range";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";

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
