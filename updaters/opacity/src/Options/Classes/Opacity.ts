import { type IOptionLoader, RangedAnimationValueWithRandom, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IOpacity } from "../Interfaces/IOpacity.js";
import { OpacityAnimation } from "./OpacityAnimation.js";

/**
 * [[include:Options/Particles/Opacity.md]]
 */
export class Opacity extends RangedAnimationValueWithRandom implements IOpacity, IOptionLoader<IOpacity> {
  override readonly animation = new OpacityAnimation();

  override value = 1;

  override load(data?: RecursivePartial<IOpacity>): void {
    if (isNull(data)) {
      return;
    }

    super.load(data);

    const animation = data.animation;

    if (animation !== undefined) {
      this.animation.load(animation);
    }
  }
}
