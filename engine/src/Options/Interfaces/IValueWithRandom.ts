import type { IAnimation, IRangedAnimation } from "./IAnimation.js";
import type { IRandom } from "./IRandom.js";
import type { RangeValue } from "../../Types/RangeValue.js";

export interface IValueWithRandom {
    /**
     * @deprecated Use the new {@link RangeValue} type instead of random
     */
    random: boolean | IRandom;

    value: RangeValue;
}

export interface IAnimationValueWithRandom extends IValueWithRandom {
    animation: IAnimation;
}

export interface IRangedAnimationValueWithRandom extends IAnimationValueWithRandom {
    animation: IRangedAnimation;
}
