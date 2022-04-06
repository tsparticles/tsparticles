import type {
    PolygonMaskInlineArrangement,
    PolygonMaskInlineArrangementAlt,
} from "../../Enums/PolygonMaskInlineArrangement";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskInline {
    arrangement:
        | PolygonMaskInlineArrangement
        | keyof typeof PolygonMaskInlineArrangement
        | PolygonMaskInlineArrangementAlt;
}
