import {
  type IAnimation,
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";

/** Gradient angle animation options class */
export class GradientAngleAnimation implements IAnimation, IOptionLoader<IAnimation> {
  /** Animation repeat count */
  count: RangeValue = 0;
  /** Animation decay */
  decay: RangeValue = 0;
  /** Animation delay */
  delay: RangeValue = 0;
  /** Enables the animation */
  enable = false;
  /** Animation speed */
  speed: RangeValue = 0;
  /** Enables animation sync */
  sync = false;
  /** GradientAngleAnimation constructor */

  /**
   * Loads the gradient angle animation from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IAnimation>): void {
    if (isNull(data)) {
      return;
    }

    loadRangeProperty(this, "count", data.count);
    loadProperty(this, "enable", data.enable);
    loadRangeProperty(this, "speed", data.speed);
    loadRangeProperty(this, "decay", data.decay);
    loadRangeProperty(this, "delay", data.delay);
    loadProperty(this, "sync", data.sync);
  }
}
