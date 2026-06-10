import { loadProperty, loadRangeProperty } from "../../Utils/OptionsUtils.js";
import { AnimationOptions } from "./AnimationOptions.js";
import type { IColorAnimation } from "../Interfaces/IColorAnimation.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

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

  protected override doLoad(data: RecursivePartial<IColorAnimation>): void {
    super.doLoad(data);
    loadProperty(this, "max", data.max);
    loadProperty(this, "min", data.min);
    loadRangeProperty(this, "offset", data.offset);
  }
}
