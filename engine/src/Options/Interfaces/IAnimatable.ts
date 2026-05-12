import type { IAnimation } from "./IAnimation.js";

/**
 * Marks an options object as containing animation settings.
 */
export interface IAnimatable<T extends IAnimation> {
  /**
   * The animation property
   */
  animation: T;
}
