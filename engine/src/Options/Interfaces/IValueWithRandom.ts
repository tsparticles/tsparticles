import type { IAnimation, IRangedAnimation } from "./IAnimation";
import type { IRandom } from "./IRandom";
import type { RangeValue } from "../../Types/RangeValue";

export interface IValueWithRandom {
    /**
     * @deprecated Use the new {@link RangeValue} type instead of random
     */
    random: boolean | IRandom;

    value: RangeValue;
}

export interface IAnimationValueWithRandom extends IValueWithRandom {
    /**
     * @deprecated Use the new {@link animation} type instead of anim
     */
    anim: IAnimation;

    animation: IAnimation;
}

export interface IRangedAnimationValueWithRandom extends IAnimationValueWithRandom {
    /**
     * @deprecated Use the new {@link animation} type instead of anim
     */
    anim: IRangedAnimation;

    animation: IRangedAnimation;
}
