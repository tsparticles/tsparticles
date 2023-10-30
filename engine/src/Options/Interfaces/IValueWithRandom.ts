import type { IAnimation, IRangedAnimation } from "./IAnimation.js";
import type { RangeValue } from "../../Types/RangeValue.js";

export interface IValueWithRandom {
    value: RangeValue;
}

export interface IAnimationValueWithRandom extends IValueWithRandom {
    animation: IAnimation;
}

export interface IRangedAnimationValueWithRandom extends IAnimationValueWithRandom {
    animation: IRangedAnimation;
}
