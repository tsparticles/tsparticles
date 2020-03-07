import {PolygonMaskType} from "../../../Enums/PolygonMaskType";
import {IPolygonMaskDraw} from "./IPolygonMaskDraw";
import {IPolygonMaskMove} from "./IPolygonMaskMove";

export interface IPolygonMask {
    draw: IPolygonMaskDraw;
    move: IPolygonMaskMove;
    scale: number;
    type: PolygonMaskType;
    url: string;
}
