import type { IDrawStroke } from "../Interfaces/IDrawStroke";
import type { RecursivePartial } from "tsparticles-engine/Types";
import { OptionsColor } from "tsparticles-engine/Options/Classes/OptionsColor";
import { stringToAlpha } from "tsparticles-engine/Utils";
import type { IOptionLoader } from "tsparticles-engine/Options/Interfaces/IOptionLoader";

/**
 * @category Polygon Mask Plugin
 */
export class DrawStroke implements IDrawStroke, IOptionLoader<IDrawStroke> {
    public color;
    public width;
    public opacity;

    constructor() {
        this.color = new OptionsColor();
        this.width = 0.5;
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<IDrawStroke>): void {
        if (data !== undefined) {
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
}
