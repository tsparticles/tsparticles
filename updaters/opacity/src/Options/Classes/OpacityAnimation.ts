import {
  DestroyType,
  type IOptionLoader,
  RangedAnimationOptions,
  type RecursivePartial,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { IOpacityAnimation } from "../Interfaces/IOpacityAnimation.js";

/**
 * Opacity animation options.
 */
export class OpacityAnimation
  extends RangedAnimationOptions
  implements IOpacityAnimation, IOptionLoader<IOpacityAnimation>
{
  destroy: DestroyType | keyof typeof DestroyType = DestroyType.none;

  override load(data?: RecursivePartial<IOpacityAnimation>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    loadProperty(this, "destroy", data.destroy);
  }
}
