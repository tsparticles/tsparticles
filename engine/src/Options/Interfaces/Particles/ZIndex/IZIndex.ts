import type { IValueWithRandom } from "../../IValueWithRandom.js";

/**
 * [[include:Options/Particles/ZIndex.md]]
 */
export interface IZIndex extends IValueWithRandom {
  /**
   * The particles z-index factor for opacity
   */
  opacityRate: number;

  /**
   * The particles z-index factor for size
   */
  sizeRate: number;

  /**
   * The particles z-index factor for velocity
   */
  velocityRate: number;
}
