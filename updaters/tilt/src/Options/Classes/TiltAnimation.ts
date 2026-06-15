import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { ITiltAnimation } from "../Interfaces/ITiltAnimation.js";

/** Tilt animation options class */
export class TiltAnimation implements ITiltAnimation, IOptionLoader<ITiltAnimation> {
  /** Animation decay */
  decay: RangeValue = 0;
  /** Enables the animation */
  enable = false;
  /** Animation speed */
  speed: RangeValue = 0;
  /** Enables animation sync */
  sync = false;
  /** TiltAnimation constructor */

  /**
   * Loads the tilt animation from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<ITiltAnimation>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadRangeProperty(this, "speed", data.speed);
    loadRangeProperty(this, "decay", data.decay);
    loadProperty(this, "sync", data.sync);
  }
}
