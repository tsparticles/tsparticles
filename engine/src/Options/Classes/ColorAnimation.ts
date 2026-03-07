import { AnimationOptions } from "./AnimationOptions.js";
import type { IColorAnimation } from "../Interfaces/IColorAnimation.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { isNull } from "../../Utils/TypeUtils.js";
import { setRangeValue } from "../../Utils/MathUtils.js";

/**
 */
export class ColorAnimation extends AnimationOptions implements IColorAnimation, IOptionLoader<IColorAnimation> {
  max;
  min;
  offset: RangeValue;

  constructor(min: number, max: number) {
    super();

    this.min = min;
    this.max = max;
    this.offset = 0;
    this.sync = true;
  }

  override load(data?: RecursivePartial<IColorAnimation>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    if (data.max !== undefined) {
      this.max = data.max;
    }

    if (data.min !== undefined) {
      this.min = data.min;
    }

    if (data.offset !== undefined) {
      this.offset = setRangeValue(data.offset);
    }
  }
}
