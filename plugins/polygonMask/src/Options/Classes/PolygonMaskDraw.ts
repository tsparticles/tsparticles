import type { IPolygonMaskDraw } from "../Interfaces/IPolygonMaskDraw";
import { PolygonMaskDrawStroke } from "./PolygonMaskDrawStroke";
import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import { OptionsColor } from "tsparticles-engine";

/**
 * @category Polygon Mask Plugin
 */
export class PolygonMaskDraw implements IPolygonMaskDraw, IOptionLoader<IPolygonMaskDraw> {
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
    get lineColor(): string | OptionsColor {
        return this.stroke.color;
    }

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */
    set lineColor(value: string | OptionsColor) {
        this.stroke.color = OptionsColor.create(this.stroke.color, value);
    }

    enable;
    stroke;

    constructor() {
        this.enable = false;
        this.stroke = new PolygonMaskDrawStroke();
    }

    load(data?: RecursivePartial<IPolygonMaskDraw>): void {
        if (!data) {
            return;
        }

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
