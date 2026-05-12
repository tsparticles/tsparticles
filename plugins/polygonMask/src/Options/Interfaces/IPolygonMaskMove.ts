import type { PolygonMaskMoveType } from "../../Enums/PolygonMaskMoveType.js";

/** The polygon mask move options */
export interface IPolygonMaskMove {
  /** The polygon mask move radius */
  radius: number;
  /** The polygon mask move type */
  type: PolygonMaskMoveType | keyof typeof PolygonMaskMoveType;
}
