import { type IOptionLoader, type RangeValue, type RecursivePartial, isNull, setRangeValue } from "@tsparticles/engine";
import type { IRotateAnimation } from "../Interfaces/IRotateAnimation.js";

/** Rotate animation options class */
export class RotateAnimation implements IRotateAnimation, IOptionLoader<IRotateAnimation> {
  /** Animation decay */
  decay: RangeValue;
  /** Enables the animation */
  enable;
  /** Animation speed */
  speed: RangeValue;
  /** Enables animation sync */
  sync;

  /** RotateAnimation constructor */
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.sync = false;
  }

  /**
   * Loads the rotate animation from data
   * @param data
   */
  load(data?: RecursivePartial<IRotateAnimation>): void {
    if (isNull(data)) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }

    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
