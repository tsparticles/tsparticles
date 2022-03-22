import type { PolygonMaskInlineArrangement, PolygonMaskInlineArrangementAlt, PolygonMaskType } from "../../Enums";
import type { ICoordinates } from "../../../../Core";
import type { IPolygonMaskDraw } from "./IPolygonMaskDraw";
import type { IPolygonMaskInline } from "./IPolygonMaskInline";
import type { IPolygonMaskLocalSvg } from "./IPolygonMaskLocalSvg";
import type { IPolygonMaskMove } from "./IPolygonMaskMove";

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
