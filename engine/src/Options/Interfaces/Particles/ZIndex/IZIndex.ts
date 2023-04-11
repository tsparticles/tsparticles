import type { IValueWithRandom } from "../../IValueWithRandom";

/**
 
 * [[include:Options/Particles/ZIndex.md]]
 */
export interface IZIndex extends IValueWithRandom {
    opacityRate: number;
    sizeRate: number;
    velocityRate: number;
}
