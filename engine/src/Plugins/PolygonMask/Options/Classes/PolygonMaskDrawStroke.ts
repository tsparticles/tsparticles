import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IPolygonMaskDrawStroke } from "../Interfaces/IPolygonMaskDrawStroke";
import { OptionsColor } from "../../../../Options/Classes/OptionsColor";
import type { RecursivePartial } from "../../../../Types";
import { stringToAlpha } from "../../../../Utils";

/**
 * @category Polygon Mask Plugin
 */
export class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke, IOptionLoader<IPolygonMaskDrawStroke> {
    color;
    width;
    opacity;

    constructor() {
        this.color = new OptionsColor();
        this.width = 0.5;
        this.opacity = 1;
    }

    load(data?: RecursivePartial<IPolygonMaskDrawStroke>): void {
        if (!data) {
            return;
        }

        this.color = OptionsColor.create(this.color, data.color);

        if (typeof this.color.value === "string") {
            this.opacity = stringToAlpha(this.color.value) ?? this.opacity;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }

        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}
