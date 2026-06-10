import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  StartValueType,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IGradientColorOpacityAnimation } from "../Interfaces/IOptionsGradient.js";

/** Gradient color opacity animation options class */
export class GradientColorOpacityAnimation
  implements IGradientColorOpacityAnimation, IOptionLoader<IGradientColorOpacityAnimation>
{
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
  /** Animation start value */
  startValue: StartValueType | keyof typeof StartValueType;
  /** Enables animation sync */
  sync;

  /** GradientColorOpacityAnimation constructor */
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
    this.startValue = StartValueType.random;
  }

  /**
   * Loads the gradient color opacity animation from data
   * @param data
   */
  load(data?: RecursivePartial<IGradientColorOpacityAnimation>): void {
    if (isNull(data)) {
      return;
    }

    loadRangeProperty(this, "count", data.count);
    loadProperty(this, "enable", data.enable);
    loadRangeProperty(this, "speed", data.speed);
    loadProperty(this, "sync", data.sync);
    loadProperty(this, "startValue", data.startValue);
    loadRangeProperty(this, "decay", data.decay);
    loadRangeProperty(this, "delay", data.delay);
  }
}
