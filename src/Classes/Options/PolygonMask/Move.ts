import {IPolygonMaskMove} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskMove";
import {Utils} from "../../Utils/Utils";

export class Move implements IPolygonMaskMove {
    public radius: number;

    constructor() {
        this.radius = 10;
    }

    public load(data: IPolygonMaskMove): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.radius)) {
                this.radius = data.radius;
            }
        }
    }
}
