import { type IOptionLoader, RangedAnimationValueWithRandom, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ISize } from "../Interfaces/ISize.js";
import { SizeAnimation } from "./SizeAnimation.js";

/**
 * [[include:Options/Particles/Size.md]]
 */
export class Size extends RangedAnimationValueWithRandom implements ISize, IOptionLoader<ISize> {
  override readonly animation = new SizeAnimation();

  override value = 3;

  override load(data?: RecursivePartial<ISize>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    const animation = data.animation;

    if (animation !== undefined) {
      this.animation.load(animation);
    }
  }
}
