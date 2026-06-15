import {
  type IAnimatable,
  type IAnimation,
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadRangeProperty,
} from "@tsparticles/engine";
import { GradientColorOpacityAnimation } from "./GradientColorOpacityAnimation.js";
import type { IGradientColorOpacity } from "../Interfaces/Gradients.js";
import type { IGradientColorOpacityAnimation } from "../Interfaces/IOptionsGradient.js";

/** Gradient color opacity options class */
export class GradientColorOpacity
  implements
    IGradientColorOpacity,
    IAnimatable<GradientColorOpacityAnimation>,
    IOptionLoader<IGradientColorOpacity & IAnimatable<IGradientColorOpacityAnimation>>
{
  /** Color opacity animation */
  readonly animation = new GradientColorOpacityAnimation();
  /** Color opacity value */
  value: RangeValue = 0;
  /** GradientColorOpacity constructor */

  /**
   * Loads the gradient color opacity from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IGradientColorOpacity & IAnimatable<IAnimation>>): void {
    if (isNull(data)) {
      return;
    }

    this.animation.load(data.animation);

    loadRangeProperty(this, "value", data.value);
  }
}
