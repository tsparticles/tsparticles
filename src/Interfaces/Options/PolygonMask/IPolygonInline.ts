import type { PolygonMaskInlineArrangement } from "../../../Enums/PolygonMaskInlineArrangement";
import type { IOptionLoader } from "../IOptionLoader";

export interface IPolygonInline extends IOptionLoader<IPolygonInline> {
    arrangement: PolygonMaskInlineArrangement
}
