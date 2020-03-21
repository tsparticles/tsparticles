import type { IOptionLoader } from "../IOptionLoader";
import type { IPolygonMaskDrawStroke } from "./IPolygonMaskDrawStroke";
import type { IColor } from "../Particles/IColor";

export interface IPolygonMaskDraw extends IOptionLoader<IPolygonMaskDraw> {
    enable: boolean;

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color property
     */
    lineColor: string | IColor;

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.width property
     */
    lineWidth: number;

    stroke: IPolygonMaskDrawStroke;
}
