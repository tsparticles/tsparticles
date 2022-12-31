import type { IAnimation, IRangedAnimation } from "./IAnimation";
import type { IRandom } from "./IRandom";
import type { RangeValue } from "../../Types/RangeValue";

export interface IValueWithRandom {
    /**
     * @deprecated Use the new [[RangeValue]] type instead of random
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
