import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IRotateAnimation } from "../Interfaces/IRotateAnimation.js";

/** Rotate animation options class */
export class RotateAnimation implements IRotateAnimation, IOptionLoader<IRotateAnimation> {
  /** Animation decay */
  decay: RangeValue = 0;
  /** Enables the animation */
  enable = false;
  /** Animation speed */
  speed: RangeValue = 0;
  /** Enables animation sync */
  sync = false;
  /** RotateAnimation constructor */

  /**
   * Loads the rotate animation from data
   * @param data
   */
  load(data?: RecursivePartial<IRotateAnimation>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadRangeProperty(this, "speed", data.speed);
    loadRangeProperty(this, "decay", data.decay);
    loadProperty(this, "sync", data.sync);
  }
}
