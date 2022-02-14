import type { ICoordinates } from "tsparticles-engine";
import type { IPolygonMaskDraw } from "./IPolygonMaskDraw";
import type { IPolygonMaskInline } from "./IPolygonMaskInline";
import type { IPolygonMaskLocalSvg } from "./IPolygonMaskLocalSvg";
import type { IPolygonMaskMove } from "./IPolygonMaskMove";
import type { PolygonMaskType } from "../../Enums";

/**
 * [[include:Options/Plugins/PolygonMask.md]]
 * @category Polygon Mask Plugin
 */
export interface IPolygonMask {
    draw: IPolygonMaskDraw;
    enable: boolean;
    inline: IPolygonMaskInline;
    move: IPolygonMaskMove;
    position?: ICoordinates;
    scale: number;
    type: PolygonMaskType;
    url?: string;
    data?: string | IPolygonMaskLocalSvg;
}
