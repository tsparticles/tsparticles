import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IDrawStroke } from "./IDrawStroke";
import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface IDraw extends IOptionLoader<IDraw> {
    enable: boolean;

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color property
     */
    lineColor: string | IColor;

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.width property
     */
    lineWidth: number;

    stroke: IDrawStroke;
}
