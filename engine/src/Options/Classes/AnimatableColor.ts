import { isArray, isString } from "../../Utils/TypeUtils.js";
import { HslAnimation } from "./HslAnimation.js";
import type { IAnimatableColor } from "../Interfaces/IAnimatableColor.js";
import type { IColorAnimation } from "../Interfaces/IColorAnimation.js";
import type { IHslAnimation } from "../Interfaces/IHslAnimation.js";
import { OptionsColor } from "./OptionsColor.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

/**
 * [[include:Options/Particles/Color.md]]
 */
export class AnimatableColor extends OptionsColor implements IAnimatableColor {
  readonly animation = new HslAnimation();

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

    const colorAnimation = data.animation as RecursivePartial<IColorAnimation | undefined>;

    if (colorAnimation !== undefined) {
      if (colorAnimation.enable === undefined) {
        this.animation.load(data.animation as IHslAnimation);
      } else {
        this.animation.h.load(colorAnimation);
      }
    }
  }
}
