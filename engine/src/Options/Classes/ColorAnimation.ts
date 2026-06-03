import { AnimationOptions } from "./AnimationOptions.js";
import type { IColorAnimation } from "../Interfaces/IColorAnimation.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { setRangeValue } from "../../Utils/MathUtils.js";

/** Color animation options class */
export class ColorAnimation extends AnimationOptions implements IColorAnimation {
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

  override doLoad(data: RecursivePartial<IColorAnimation>): void {
    super.doLoad(data);

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
