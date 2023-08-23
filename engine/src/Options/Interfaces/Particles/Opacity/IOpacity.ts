import type { IOpacityAnimation } from "./IOpacityAnimation";
import type { IValueWithRandom } from "../../IValueWithRandom";

/**
 * [[include:Options/Particles/Opacity.md]]
 */
export interface IOpacity extends IValueWithRandom {
    animation: IOpacityAnimation;
}
