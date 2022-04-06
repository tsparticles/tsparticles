import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ITwinkleValues } from "../../../Interfaces/Particles/Twinkle/ITwinkleValues";
import { OptionsColor } from "../../OptionsColor";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { setRangeValue } from "../../../../Utils/NumberUtils";

/**
 * @category Options
 */
export class TwinkleValues implements ITwinkleValues, IOptionLoader<ITwinkleValues> {
    color?: OptionsColor;
    enable;
    frequency;
    opacity: RangeValue;

    constructor() {
        this.enable = false;
        this.frequency = 0.05;
        this.opacity = 1;
    }

    load(data?: RecursivePartial<ITwinkleValues>): void {
        if (!data) {
            return;
        }

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
            this.opacity = setRangeValue(data.opacity);
        }
    }
}
