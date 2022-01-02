import type { PolygonMaskInlineArrangement, PolygonMaskInlineArrangementAlt } from "../../Enums";

/**
 * @category Polygon Mask Plugin
 */
export interface IInline {
    arrangement:
        | PolygonMaskInlineArrangement
        | keyof typeof PolygonMaskInlineArrangement
        | PolygonMaskInlineArrangementAlt;
}
