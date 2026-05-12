import type { IPolygonMaskDrawStroke } from "./IPolygonMaskDrawStroke.js";

/** The polygon mask draw options */
export interface IPolygonMaskDraw {
  /** Enables the polygon mask drawing */
  enable: boolean;
  /** The polygon mask draw stroke options */
  stroke: IPolygonMaskDrawStroke;
}
