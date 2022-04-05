import type { PolygonMaskMoveType } from "../../Enums/PolygonMaskMoveType";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskMove {
    radius: number;
    type: PolygonMaskMoveType | keyof typeof PolygonMaskMoveType;
}
