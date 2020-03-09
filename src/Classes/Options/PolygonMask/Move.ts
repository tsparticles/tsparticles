import {IPolygonMaskMove} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskMove";

export class Move implements IPolygonMaskMove {
    public radius: number;

    constructor() {
        this.radius = 10;
    }

    public load(data: IPolygonMaskMove): void {
        this.radius = data.radius;
    }
}
