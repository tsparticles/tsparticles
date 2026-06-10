import { OptionLoader, loadProperty, loadRangeProperty } from "../../../Utils/OptionsUtils.js";
import { AnimatableColor } from "../AnimatableColor.js";
import type { IFill } from "../../Interfaces/Particles/IFill.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";

/**
 * [[include:Options/Particles/Fill.md]]
 */
export class Fill extends OptionLoader<IFill> implements IFill {
  color?: AnimatableColor;
  enable: boolean;
  opacity: RangeValue;

  constructor() {
    super();
    this.enable = true;
    this.opacity = 1;
  }

  protected doLoad(data: RecursivePartial<IFill>): void {
    if (data.color !== undefined) {
      this.color = AnimatableColor.create(this.color, data.color);
    }

    loadProperty(this, "enable", data.enable);
    loadRangeProperty(this, "opacity", data.opacity);
  }
}
