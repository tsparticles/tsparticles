import { OptionLoader, loadRangeProperty } from "../../../Utils/OptionsUtils.js";
import { AnimatableColor } from "../AnimatableColor.js";
import type { IStroke } from "../../Interfaces/Particles/IStroke.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";

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

  protected doLoad(data: RecursivePartial<IStroke>): void {
    if (data.color !== undefined) {
      this.color = AnimatableColor.create(this.color, data.color);
    }

    loadRangeProperty(this, "width", data.width);
    loadRangeProperty(this, "opacity", data.opacity);
  }
}
