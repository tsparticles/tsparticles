import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IPolygonMaskMove } from "../Interfaces/IPolygonMaskMove.js";
import { PolygonMaskMoveType } from "../../Enums/PolygonMaskMoveType.js";

/**
 */
export class PolygonMaskMove implements IPolygonMaskMove, IOptionLoader<IPolygonMaskMove> {
    radius;
    type: PolygonMaskMoveType | keyof typeof PolygonMaskMoveType;

    constructor() {
        this.radius = 10;
        this.type = PolygonMaskMoveType.path;
    }

    load(data?: RecursivePartial<IPolygonMaskMove>): void {
        if (isNull(data)) {
            return;
        }

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
