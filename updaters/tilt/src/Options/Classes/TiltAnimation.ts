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
  decay: RangeValue;
  /** Enables the animation */
  enable;
  /** Animation speed */
  speed: RangeValue;
  /** Enables animation sync */
  sync;

  /** TiltAnimation constructor */
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.sync = false;
  }

  /**
   * Loads the tilt animation from data
   * @param data
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
