import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IMotionReduce } from "../Interfaces/IMotionReduce.js";

/**
 */
export class MotionReduce implements IMotionReduce, IOptionLoader<IMotionReduce> {
  /**
   * Factor used to reduce motion, the higher the value, the higher the motion reduction
   */
  factor = 4;
  /**
   * Reduces motion settings for users with `prefer-reduced-motion` enabled
   */
  value = true;

  load(data?: RecursivePartial<IMotionReduce>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "factor", data.factor);
    loadProperty(this, "value", data.value);
  }
}
