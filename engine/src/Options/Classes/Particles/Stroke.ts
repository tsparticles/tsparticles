import { AnimatableColor } from "../AnimatableColor.js";
import type { IStroke } from "../../Interfaces/Particles/IStroke.js";
import { OptionLoader } from "../../../Utils/OptionLoader.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { loadRangeProperty } from "../../../Utils/OptionsUtils.js";

/**
 * [[include:Options/Particles/Stroke.md]]
 */
export class Stroke extends OptionLoader<IStroke> implements IStroke {
  color?: AnimatableColor;
  opacity?: RangeValue;
  width: RangeValue = 0;

  protected doLoad(data: RecursivePartial<IStroke>): void {
    if (data.color !== undefined) {
      this.color = AnimatableColor.create(this.color, data.color);
    }

    loadRangeProperty(this, "width", data.width);
    loadRangeProperty(this, "opacity", data.opacity);
  }
}
