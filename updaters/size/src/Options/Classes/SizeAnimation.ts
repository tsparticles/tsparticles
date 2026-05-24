import {
  DestroyType,
  type IOptionLoader,
  RangedAnimationOptions,
  type RecursivePartial,
  isNull,
} from "@tsparticles/engine";
import type { ISizeAnimation } from "../Interfaces/ISizeAnimation.js";

/**
 * Size animation options.
 */
export class SizeAnimation extends RangedAnimationOptions implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
  destroy: DestroyType | keyof typeof DestroyType;

  constructor() {
    super();

    this.destroy = DestroyType.none;
    this.speed = 5;
  }

  override load(data?: RecursivePartial<ISizeAnimation>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }
  }
}
