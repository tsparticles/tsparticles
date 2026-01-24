import { DestroyType } from "../../../../Enums/Types/DestroyType.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation.js";
import { RangedAnimationOptions } from "../../AnimationOptions.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { isNull } from "../../../../Utils/TypeUtils.js";

/**
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
