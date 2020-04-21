import type { IPolygonMaskDrawStroke } from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IOptionsColor } from "../../../Interfaces/Options/Particles/IOptionsColor";
import { OptionsColor } from "../Particles/OptionsColor";
import { ColorUtils } from "../../Utils/ColorUtils";

export class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke {
    public color: IOptionsColor;
    public width: number;
    public opacity: number;

    constructor() {
        this.color = new OptionsColor();
        this.width = 0.5;
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<IPolygonMaskDrawStroke>): void {
        if (data !== undefined) {

            this.color.load(typeof data.color === "string" ? { value: data.color } : data.color);

            if (typeof this.color.value === "string") {
                this.opacity = ColorUtils.stringToAlpha(this.color.value) ?? this.opacity;
            }

            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }

            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
