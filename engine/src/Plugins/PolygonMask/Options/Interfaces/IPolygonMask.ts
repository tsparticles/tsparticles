import type { IPolygonMaskDraw } from "./IPolygonMaskDraw";
import type { IPolygonMaskMove } from "./IPolygonMaskMove";
import type { PolygonMaskType, PolygonMaskInlineArrangement, PolygonMaskInlineArrangementAlt } from "../../Enums";
import type { IPolygonMaskInline } from "./IPolygonMaskInline";
import type { ICoordinates } from "../../../../Core";
import type { IPolygonMaskLocalSvg } from "./IPolygonMaskLocalSvg";

/**
 * [[include:Options/Plugins/PolygonMask.md]]
 * @category Polygon Mask Plugin
 */
export interface IPolygonMask {
    draw: IPolygonMaskDraw;
    enable: boolean;
    inline: IPolygonMaskInline;

    /**
     * @deprecated the inlineArrangement is deprecated, please use the new inline.arrangement property
     */
    inlineArrangement:
        | PolygonMaskInlineArrangement
        | keyof typeof PolygonMaskInlineArrangement
        | PolygonMaskInlineArrangementAlt;

    move: IPolygonMaskMove;
    position?: ICoordinates;
    scale: number;
    type: PolygonMaskType;
    url?: string;
    data?: string | IPolygonMaskLocalSvg;
}
