import type { IOptionsColor } from "./IOptionsColor";
import type { IColorAnimation } from "./IColorAnimation";
import type { IHslAnimation } from "./IHslAnimation";

/**
 * The animatable color interface, it provides all the necessary properties to create a color animation
 * [[include:Options/Particles/Color.md]]
 * @category Options
 */
export interface IAnimatableColor extends IOptionsColor {
    /**
     * The color animation property
     */
    animation: IColorAnimation | IHslAnimation;
}
