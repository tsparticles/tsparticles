import type { IDraw } from "./IDraw";
import type { IMove } from "./IMove";
import type { PolygonMaskType, PolygonMaskInlineArrangement, PolygonMaskInlineArrangementAlt } from "../../Enums";
import type { IInline } from "./IInline";
import type { ICoordinates } from "../../../../Core/Interfaces";
import type { ILocalSvg } from "./ILocalSvg";

/**
 * [[include:Options/Plugins/PolygonMask.md]]
 * @category Polygon Mask Plugin
 */
export interface IPolygonMask {
    draw: IDraw;
    enable: boolean;
    inline: IInline;

    /**
     * @deprecated the inlineArrangement is deprecated, please use the new inline.arrangement property
     */
    inlineArrangement:
        | PolygonMaskInlineArrangement
        | keyof typeof PolygonMaskInlineArrangement
        | PolygonMaskInlineArrangementAlt;

    move: IMove;
    position?: ICoordinates;
    scale: number;
    type: PolygonMaskType;
    url?: string;
    data?: string | ILocalSvg;
}
