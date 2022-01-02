import type { IInline } from "../Interfaces/IInline";
import { PolygonMaskInlineArrangement, PolygonMaskInlineArrangementAlt } from "../../Enums";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";

/**
 * @category Polygon Mask Plugin
 */
export class Inline implements IInline, IOptionLoader<IInline> {
    arrangement:
        | PolygonMaskInlineArrangement
        | keyof typeof PolygonMaskInlineArrangement
        | PolygonMaskInlineArrangementAlt;

    constructor() {
        this.arrangement = PolygonMaskInlineArrangement.onePerPoint;
    }

    load(data?: RecursivePartial<IInline>): void {
        if (data !== undefined) {
            if (data.arrangement !== undefined) {
                this.arrangement = data.arrangement;
            }
        }
    }
}
