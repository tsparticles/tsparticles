import type { ITwinkleValues } from "../../../Interfaces/Particles/Twinkle/ITwinkleValues";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../OptionsColor";

export class TwinkleValues implements ITwinkleValues {
    public color?: OptionsColor;
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
                this.color = OptionsColor.create(this.color, data.color);
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
