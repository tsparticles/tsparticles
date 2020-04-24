import type { IPolygonMaskDraw } from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDraw";
import type { IPolygonMaskDrawStroke } from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import { PolygonMaskDrawStroke } from "./PolygonMaskDrawStroke";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IOptionsColor } from "../../../Interfaces/Options/Particles/IOptionsColor";

export class Draw implements IPolygonMaskDraw {
    /**
     * @deprecated the property lineWidth is deprecated, please use the new stroke.width
     */
    get lineWidth(): number {
        return this.stroke.width;
    }

    /**
     * @deprecated the property lineWidth is deprecated, please use the new stroke.width
     */
    set lineWidth(value: number) {
        this.stroke.width = value;
    }

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */
    get lineColor(): string | IOptionsColor {
        return this.stroke.color as IOptionsColor;
    }

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */
    set lineColor(value: string | IOptionsColor) {
        const destColor = this.stroke.color as IOptionsColor;

        if (typeof value === "string") {
            destColor.value = value;
        } else {
            destColor.load(value);
        }
    }

    public enable: boolean;
    public stroke: IPolygonMaskDrawStroke;

    constructor() {
        this.enable = false;
        this.stroke = new PolygonMaskDrawStroke();
    }

    public load(data?: RecursivePartial<IPolygonMaskDraw>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            const stroke = data.stroke ?? {
                color: data.lineColor,
                width: data.lineWidth,
            };

            this.stroke.load(stroke);
        }
    }
}
