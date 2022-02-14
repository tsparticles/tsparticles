import type { PolygonMaskInlineArrangement, PolygonMaskInlineArrangementAlt } from "../../Enums";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskInline {
    arrangement:
        | PolygonMaskInlineArrangement
        | keyof typeof PolygonMaskInlineArrangement
        | PolygonMaskInlineArrangementAlt;
}
