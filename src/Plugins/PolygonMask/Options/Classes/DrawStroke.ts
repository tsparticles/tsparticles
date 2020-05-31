import type { IDrawStroke } from "../Interfaces/IDrawStroke";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../../../Options/Classes/OptionsColor";
import { ColorUtils } from "../../../../Utils";

export class DrawStroke implements IDrawStroke {
    public color: OptionsColor;
    public width: number;
    public opacity: number;

    constructor() {
        this.color = new OptionsColor();
        this.width = 0.5;
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<IDrawStroke>): void {
        if (data !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);

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
