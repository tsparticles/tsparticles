import {PolygonMaskType} from "../../../Enums/PolygonMaskType";
import {IPolygonMaskDraw} from "./IPolygonMaskDraw";
import {IPolygonMaskMove} from "./IPolygonMaskMove";
import {PolygonMaskInlineArrangement} from "../../../Enums/PolygonMaskInlineArrangement";
import {IOptionLoader} from "../IOptionLoader";

export interface IPolygonMask extends IOptionLoader<IPolygonMask> {
    draw: IPolygonMaskDraw;
    inlineArrangement: PolygonMaskInlineArrangement;
    move: IPolygonMaskMove;
    scale: number;
    type: PolygonMaskType;
    url: string;
}
