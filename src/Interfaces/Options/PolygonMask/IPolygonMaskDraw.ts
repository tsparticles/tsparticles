import {IOptionLoader} from "../IOptionLoader";

export interface IPolygonMaskDraw extends IOptionLoader<IPolygonMaskDraw> {
    lineColor: string;
    lineWidth: number;
    enable: boolean;
}
