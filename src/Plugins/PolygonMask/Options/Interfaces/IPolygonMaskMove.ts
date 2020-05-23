import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { PolygonMaskMoveType } from "../../Enums/PolygonMaskMoveType";

export interface IPolygonMaskMove extends IOptionLoader<IPolygonMaskMove> {
    radius: number;
    type: PolygonMaskMoveType;
}
