import type { PolygonMaskInlineArrangement } from "../../../../Enums/PolygonMaskInlineArrangement";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";

export interface IPolygonInline extends IOptionLoader<IPolygonInline> {
    arrangement: PolygonMaskInlineArrangement;
}
