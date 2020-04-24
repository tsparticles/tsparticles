import type { ITwinkleValues } from "../../../../Interfaces/Options/Particles/Twinkle/ITwinkleValues";
import type { IOptionsColor } from "../../../../Interfaces/Options/Particles/IOptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../OptionsColor";

export class TwinkleValues implements ITwinkleValues {
    public color?: IOptionsColor;
    public enable: boolean;
    public frequency: number;
    public opacity: number;

    constructor() {
        this.enable = false;
        this.frequency = 0.05;
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<ITwinkleValues>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (this.color === undefined) {
                    this.color = new OptionsColor();
                }

                this.color.load(typeof data.color === "string" ? { value: data.color } : data.color);
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.frequency !== undefined) {
                this.frequency = data.frequency;
            }

            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
}
