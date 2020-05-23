import type { IPolygonMaskMove } from "../Interfaces/IPolygonMaskMove";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { PolygonMaskMoveType } from "../../Enums/PolygonMaskMoveType";

export class Move implements IPolygonMaskMove {
    public radius: number;
    public type: PolygonMaskMoveType;

    constructor() {
        this.radius = 10;
        this.type = PolygonMaskMoveType.path;
    }

    public load(data?: RecursivePartial<IPolygonMaskMove>): void {
        if (data !== undefined) {
            if (data.radius !== undefined) {
                this.radius = data.radius;
            }

            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}
