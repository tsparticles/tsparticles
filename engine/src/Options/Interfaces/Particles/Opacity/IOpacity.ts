import type { IOpacityAnimation } from "./IOpacityAnimation.js";
import type { IValueWithRandom } from "../../IValueWithRandom.js";

/**
 * [[include:Options/Particles/Opacity.md]]
 */
export interface IOpacity extends IValueWithRandom {
    animation: IOpacityAnimation;
}
