import type { IPolygonMaskDrawStroke } from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IColor } from "../../../Interfaces/Options/Particles/IColor";
import { Color } from "../Particles/Color";
import { ColorUtils } from "../../Utils/ColorUtils";

export class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke {
    public color: string | IColor;
    public width: number;
    public opacity: number;

    constructor() {
        this.color = new Color();
        this.width = 0.5;
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<IPolygonMaskDrawStroke>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (typeof this.color === "string") {
                    this.color = data.color;
                    this.opacity = ColorUtils.stringToAlpha(data.color as string) ?? this.opacity;
                } else {
                    this.color.load(data.color as IColor);
                }
            }

            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
