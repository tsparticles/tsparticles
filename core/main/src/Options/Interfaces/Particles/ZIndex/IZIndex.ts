/**
 * @category Options
 * [[include:ZIndex.md]]
 */
import type { IValueWithRandom } from "../../IValueWithRandom";

export interface IZIndex extends IValueWithRandom {
    opacityRate: number;
    velocityRate: number;
    sizeRate: number;
}
