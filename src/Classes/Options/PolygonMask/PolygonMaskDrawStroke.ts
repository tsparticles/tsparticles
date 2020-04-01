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
                if (typeof data.color === "string") {
                    this.color = data.color;
                    this.opacity = ColorUtils.stringToAlpha(data.color as string) ?? this.opacity;
                } else {
                    const color = data.color as IColor;

                    this.color = new Color();
                    this.color.load(color);

                    if (typeof color.value === "string") {
                        this.opacity = ColorUtils.stringToAlpha(color.value) ?? this.opacity;
                    }
                }
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
