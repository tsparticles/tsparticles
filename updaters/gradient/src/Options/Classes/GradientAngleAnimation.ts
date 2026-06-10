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
  count: RangeValue;
  /** Animation decay */
  decay: RangeValue;
  /** Animation delay */
  delay: RangeValue;
  /** Enables the animation */
  enable;
  /** Animation speed */
  speed: RangeValue;
  /** Enables animation sync */
  sync;

  /** GradientAngleAnimation constructor */
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
  }

  /**
   * Loads the gradient angle animation from data
   * @param data
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
