import type { PolygonMaskMoveType } from "../../Enums/PolygonMaskMoveType.js";

/**
 */
export interface IPolygonMaskMove {
  radius: number;
  type: PolygonMaskMoveType | keyof typeof PolygonMaskMoveType;
}
