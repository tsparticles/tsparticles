import type {
  PolygonMaskInlineArrangement,
  PolygonMaskInlineArrangementAlt,
} from "../../Enums/PolygonMaskInlineArrangement.js";

/** The polygon mask inline options */
export interface IPolygonMaskInline {
  /** The polygon mask inline arrangement */
  arrangement:
    | PolygonMaskInlineArrangement
    | keyof typeof PolygonMaskInlineArrangement
    | PolygonMaskInlineArrangementAlt;
}
