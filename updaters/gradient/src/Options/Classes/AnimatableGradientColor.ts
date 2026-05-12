import { AnimatableColor, type IOptionLoader, type RecursivePartial, isNull, isNumber } from "@tsparticles/engine";
import { GradientColorOpacity } from "./GradientColorOpacity.js";
import type { IAnimatableGradientColor } from "../Interfaces/IOptionsGradient.js";

/** Animatable gradient color options class */
export class AnimatableGradientColor implements IAnimatableGradientColor, IOptionLoader<IAnimatableGradientColor> {
  /** Color opacity */
  opacity?: GradientColorOpacity;
  /** Color stop position */
  stop;
  /** Color value */
  value;

  /** AnimatableGradientColor constructor */
  constructor() {
    this.stop = 0;
    this.value = new AnimatableColor();
  }

  /**
   * Loads the animatable gradient color from data
   * @param data
   */
  load(data?: RecursivePartial<IAnimatableGradientColor>): void {
    if (isNull(data)) {
      return;
    }

    if (data.stop !== undefined) {
      this.stop = data.stop;
    }

    this.value = AnimatableColor.create(this.value, data.value);

    if (data.opacity !== undefined) {
      this.opacity = new GradientColorOpacity();

      if (isNumber(data.opacity)) {
        this.opacity.value = data.opacity;
      } else {
        this.opacity.load(data.opacity);
      }
    }
  }
}
