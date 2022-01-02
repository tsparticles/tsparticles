import type { IPolygonMaskInline } from "../Interfaces/IPolygonMaskInline";
import { PolygonMaskInlineArrangement, PolygonMaskInlineArrangementAlt } from "../../Enums";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";

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
