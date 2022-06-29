import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IPolygonMaskInline } from "../Interfaces/IPolygonMaskInline";
import { PolygonMaskInlineArrangement } from "../../Enums/PolygonMaskInlineArrangement";
import type { PolygonMaskInlineArrangementAlt } from "../../Enums/PolygonMaskInlineArrangement";

/**
 * @category Polygon Mask Plugin
 */
export class PolygonMaskInline implements IPolygonMaskInline, IOptionLoader<IPolygonMaskInline> {
    arrangement:
        | PolygonMaskInlineArrangement
        | keyof typeof PolygonMaskInlineArrangement
        | PolygonMaskInlineArrangementAlt;

    constructor() {
        this.arrangement = PolygonMaskInlineArrangement.onePerPoint;
    }

    load(data?: RecursivePartial<IPolygonMaskInline>): void {
        if (!data) {
            return;
        }

        if (data.arrangement !== undefined) {
            this.arrangement = data.arrangement;
        }
    }
}
