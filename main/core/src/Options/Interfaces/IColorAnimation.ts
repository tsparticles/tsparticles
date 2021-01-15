/**
 * Color animation interface, these properties are used to animate colors
 * @category Options
 */

import type { RangeValue } from "../../Types";
import type { IAnimation } from "./IAnimation";

export interface IColorAnimation extends IAnimation {
    /**
     * The value offset percent applied to color hue
     */
    offset: RangeValue;
}
