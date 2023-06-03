import type {
    PolygonMaskInlineArrangement,
    PolygonMaskInlineArrangementAlt,
} from "../../Enums/PolygonMaskInlineArrangement";

/**
 */
export interface IPolygonMaskInline {
    arrangement:
        | PolygonMaskInlineArrangement
        | keyof typeof PolygonMaskInlineArrangement
        | PolygonMaskInlineArrangementAlt;
}
