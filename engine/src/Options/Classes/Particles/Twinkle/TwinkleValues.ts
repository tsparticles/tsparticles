import type { IOptionLoader, ITwinkleValues } from "../../../Interfaces";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import { OptionsColor } from "../../OptionsColor";
import { setRangeValue } from "../../../../Utils";

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
