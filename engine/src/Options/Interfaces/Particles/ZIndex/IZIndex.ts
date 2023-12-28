import type { IValueWithRandom } from "../../IValueWithRandom.js";

/**
 * [[include:Options/Particles/ZIndex.md]]
 */
export interface IZIndex extends IValueWithRandom {
    opacityRate: number;
    sizeRate: number;
    velocityRate: number;
}
