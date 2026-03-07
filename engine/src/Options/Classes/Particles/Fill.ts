import { AnimatableColor } from "../AnimatableColor.js";
import type { IFill } from "../../Interfaces/Particles/IFill.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { isNull } from "../../../Utils/TypeUtils.js";
import { setRangeValue } from "../../../Utils/MathUtils.js";

/**
 * [[include:Options/Particles/Fill.md]]
 */
export class Fill implements IFill, IOptionLoader<IFill> {
  color: AnimatableColor;
  enable: boolean;
  opacity: RangeValue;

  constructor() {
    this.enable = true;
    this.color = new AnimatableColor();
    this.color.value = "#fff";
    this.opacity = 1;
  }

  load(data?: RecursivePartial<IFill>): void {
    if (isNull(data)) {
      return;
    }

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
