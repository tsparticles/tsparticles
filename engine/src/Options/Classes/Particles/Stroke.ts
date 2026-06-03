import { AnimatableColor } from "../AnimatableColor.js";
import type { IStroke } from "../../Interfaces/Particles/IStroke.js";
import { OptionLoader } from "../../../Utils/OptionsUtils.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { setRangeValue } from "../../../Utils/MathUtils.js";

/**
 * [[include:Options/Particles/Stroke.md]]
 */
export class Stroke extends OptionLoader<IStroke> implements IStroke {
  color?: AnimatableColor;
  opacity?: RangeValue;
  width: RangeValue;

  constructor() {
    super();
    this.width = 0;
  }

  doLoad(data: RecursivePartial<IStroke>): void {
    if (data.color !== undefined) {
      this.color = AnimatableColor.create(this.color, data.color);
    }

    if (data.width !== undefined) {
      this.width = setRangeValue(data.width);
    }

    if (data.opacity !== undefined) {
      this.opacity = setRangeValue(data.opacity);
    }
  }
}
