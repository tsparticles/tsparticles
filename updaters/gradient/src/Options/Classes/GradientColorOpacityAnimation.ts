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
  count: RangeValue = 0;
  /** Animation decay */
  decay: RangeValue = 0;
  /** Animation delay */
  delay: RangeValue = 0;
  /** Enables the animation */
  enable = false;
  /** Animation speed */
  speed: RangeValue = 0;
  /** Animation start value */
  startValue: StartValueType | keyof typeof StartValueType = StartValueType.random;
  /** Enables animation sync */
  sync = false;
  /** GradientColorOpacityAnimation constructor */

  /**
   * Loads the gradient color opacity animation from data
   * @param data - The data to handle
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
