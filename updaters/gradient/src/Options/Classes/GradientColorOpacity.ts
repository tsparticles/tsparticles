import {
  type IAnimatable,
  type IAnimation,
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  setRangeValue,
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
  animation;
  /** Color opacity value */
  value: RangeValue;

  /** GradientColorOpacity constructor */
  constructor() {
    this.value = 0;
    this.animation = new GradientColorOpacityAnimation();
  }

  /**
   * Loads the gradient color opacity from data
   * @param data
   */
  load(data?: RecursivePartial<IGradientColorOpacity & IAnimatable<IAnimation>>): void {
    if (isNull(data)) {
      return;
    }

    this.animation.load(data.animation);

    if (data.value !== undefined) {
      this.value = setRangeValue(data.value);
    }
  }
}
