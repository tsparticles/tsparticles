import type { PolygonMaskMoveType } from "../../Enums/PolygonMaskMoveType";

/**
 */
export interface IPolygonMaskMove {
    radius: number;
    type: PolygonMaskMoveType | keyof typeof PolygonMaskMoveType;
}
