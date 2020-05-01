import type { IPolygonInline } from "../../Interfaces/PolygonMask/IPolygonInline";
import { PolygonMaskInlineArrangement } from "../../../Enums/PolygonMaskInlineArrangement";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class PolygonInline implements IPolygonInline {
    public arrangement: PolygonMaskInlineArrangement;

    constructor() {
        this.arrangement = PolygonMaskInlineArrangement.onePerPoint;
    }

    public load(data?: RecursivePartial<IPolygonInline>): void {
        if (data !== undefined) {
            if (data.arrangement !== undefined) {
                this.arrangement = data.arrangement;
            }
        }
    }
}
