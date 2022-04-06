/**
 * Color animation interface, these properties are used to animate colors
 * @category Options
 */
import type { IAnimation } from "./IAnimation";
import type { RangeValue } from "../../Types/RangeValue";

export interface IColorAnimation extends IAnimation {
    /**
     * The value offset percent applied to color hue
     */
    offset: RangeValue;
}
