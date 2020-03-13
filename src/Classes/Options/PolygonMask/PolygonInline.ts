import {IPolygonInline} from "../../../Interfaces/Options/PolygonMask/IPolygonInline";
import {PolygonMaskInlineArrangement} from "../../../Enums/PolygonMaskInlineArrangement";
import {Utils} from "../../Utils/Utils";

export class PolygonInline implements IPolygonInline {
    public arrangement: PolygonMaskInlineArrangement;

    constructor() {
        this.arrangement = PolygonMaskInlineArrangement.onePerPoint;
    }

    public load(data: IPolygonInline): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.arrangement)) {
                this.arrangement = data.arrangement;
            }
        }
    }
}
