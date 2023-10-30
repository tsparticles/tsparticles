import { AnimationOptions } from "./AnimationOptions.js";
import type { IColorAnimation } from "../Interfaces/IColorAnimation.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { setRangeValue } from "../../Utils/NumberUtils.js";

/**
 */
export class ColorAnimation extends AnimationOptions implements IColorAnimation, IOptionLoader<IColorAnimation> {
    offset: RangeValue;

    constructor() {
        super();

        this.offset = 0;
        this.sync = true;
    }

    load(data?: RecursivePartial<IColorAnimation>): void {
        if (!data) {
            return;
        }

        if (data.offset !== undefined) {
            this.offset = setRangeValue(data.offset);
        }
    }
}
