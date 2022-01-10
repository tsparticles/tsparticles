import type { IPolygonMaskMove } from "../Interfaces/IPolygonMaskMove";
import type { RecursivePartial } from "tsparticles-engine";
import { PolygonMaskMoveType } from "../../Enums";
import type { IOptionLoader } from "tsparticles-engine/Options/Interfaces/IOptionLoader";

/**
 * @category Polygon Mask Plugin
 */
export class PolygonMaskMove implements IPolygonMaskMove, IOptionLoader<IPolygonMaskMove> {
    radius;
    type: PolygonMaskMoveType | keyof typeof PolygonMaskMoveType;

    constructor() {
        this.radius = 10;
        this.type = PolygonMaskMoveType.path;
    }

    load(data?: RecursivePartial<IPolygonMaskMove>): void {
        if (!data) {
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
