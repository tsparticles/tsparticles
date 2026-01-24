import { isArray, isNull, isString } from "../../Utils/TypeUtils.js";
import { HslAnimation } from "./HslAnimation.js";
import type { IAnimatableColor } from "../Interfaces/IAnimatableColor.js";
import type { IColorAnimation } from "../Interfaces/IColorAnimation.js";
import type { IHslAnimation } from "../Interfaces/IHslAnimation.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import { OptionsColor } from "./OptionsColor.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

/**
 * [[include:Options/Particles/Color.md]]
 */
export class AnimatableColor extends OptionsColor implements IAnimatableColor, IOptionLoader<IAnimatableColor> {
  animation;

  constructor() {
    super();

    this.animation = new HslAnimation();
  }

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

  override load(data?: RecursivePartial<IAnimatableColor>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

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
