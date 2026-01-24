import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IMotion } from "../Interfaces/IMotion.js";
import { MotionReduce } from "./MotionReduce.js";

/**
 * [[include:Options/Motion.md]]
 */
export class Motion implements IMotion, IOptionLoader<IMotion> {
  /**
   * Disables motions for users with `prefer-reduced-motion` enabled
   */
  disable;

  /**
   * Reduce motion settings for users with `prefer-reduced-motion` enabled
   * If {@link disable} is `true` these values will be ignored
   */
  reduce;

  constructor() {
    this.disable = true;
    this.reduce = new MotionReduce();
  }

  load(data?: RecursivePartial<IMotion>): void {
    if (isNull(data)) {
      return;
    }

    if (data.disable !== undefined) {
      this.disable = data.disable;
    }

    this.reduce.load(data.reduce);
  }
}
