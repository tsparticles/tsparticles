import {PolygonMaskType} from "../../../Enums/PolygonMaskType";
import {IOptionsPolygonMaskDraw} from "./IOptionsPolygonMaskDraw";
import {IOptionsPolygonMaskMove} from "./IOptionsPolygonMaskMove";

export interface IOptionsPolygonMask {
    draw: IOptionsPolygonMaskDraw;
    move: IOptionsPolygonMaskMove;
    scale: number;
    type: PolygonMaskType;
    url: string;
}
