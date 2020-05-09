import type { PolygonMaskType } from "../../../Enums/PolygonMaskType";
import type { IPolygonMaskDraw } from "./IPolygonMaskDraw";
import type { IPolygonMaskMove } from "./IPolygonMaskMove";
import type { PolygonMaskInlineArrangement } from "../../../Enums/PolygonMaskInlineArrangement";
import type { IOptionLoader } from "../IOptionLoader";
import type { IPolygonInline } from "./IPolygonInline";
import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";

export interface IPolygonMask extends IOptionLoader<IPolygonMask> {
    draw: IPolygonMaskDraw;
    enable: boolean;
    inline: IPolygonInline;

    /**
     * @deprecated the inlineArrangement is deprecated, please use the new inline.arrangement property
     */
    inlineArrangement: PolygonMaskInlineArrangement;

    move: IPolygonMaskMove;
    position?: ICoordinates;
    scale: number;
    type: PolygonMaskType;
    url: string;
}
