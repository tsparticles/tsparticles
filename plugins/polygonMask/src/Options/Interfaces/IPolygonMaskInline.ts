import type {
  PolygonMaskInlineArrangement,
  PolygonMaskInlineArrangementAlt,
} from "../../Enums/PolygonMaskInlineArrangement.js";

/**
 */
export interface IPolygonMaskInline {
  arrangement:
    | PolygonMaskInlineArrangement
    | keyof typeof PolygonMaskInlineArrangement
    | PolygonMaskInlineArrangementAlt;
}
