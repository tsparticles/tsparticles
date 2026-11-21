import { isArray, isString } from "../../Utils/TypeUtils.js";
import type { IAnimatableColor } from "../Interfaces/IAnimatableColor.js";
import type { IColorAnimation } from "../Interfaces/IColorAnimation.js";
import type { IOklchAnimation } from "../Interfaces/IOklchAnimation.js";
import { OklchAnimation } from "./OklchAnimation.js";
import { OptionsColor } from "./OptionsColor.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

/**
 * [[include:Options/Particles/Color.md]]
 */
export class AnimatableColor extends OptionsColor implements IAnimatableColor {
  readonly animation = new OklchAnimation();

  /**
   * Creates an animatable color from optional source and input data.
   * @param source - Existing color instance to clone from.
   * @param data - Color input data.
   * @returns A configured animatable color instance.
   */
  static override create(
    source?: AnimatableColor,
    data?: SingleOrMultiple<string> | RecursivePartial<IAnimatableColor>,
  ): AnimatableColor {
    const color = new AnimatableColor();

    color.load(source);

    if (data !== undefined) {
      if (isString(data) || isArray(data)) {
        color.load({ value: data });
      } else {
        color.load(data);
      }
    }

    return color;
  }

  protected override doLoad(data: RecursivePartial<IAnimatableColor>): void {
    super.doLoad(data);

    const colorAnimation = data.animation as RecursivePartial<
      IColorAnimation | undefined
    >;

    if (colorAnimation !== undefined) {
      if ("s" in colorAnimation) {
        throw new Error(
          "HSL color animation is not supported in v5; migrate animation.s to an explicit OKLCH animation.c value.",
        );
      }

      if (colorAnimation.enable === undefined) {
        this.animation.load(data.animation as IOklchAnimation);
      } else {
        this.animation.h.load(colorAnimation);
      }
    }
  }
}
