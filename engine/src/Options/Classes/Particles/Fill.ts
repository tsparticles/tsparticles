import { AnimatableColor } from "../AnimatableColor.js";
import type { IFill } from "../../Interfaces/Particles/IFill.js";
import { OptionLoader } from "../../../Utils/OptionsUtils.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { setRangeValue } from "../../../Utils/MathUtils.js";

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

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.opacity !== undefined) {
      this.opacity = setRangeValue(data.opacity);
    }
  }
}
