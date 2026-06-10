import { OptionLoader, loadLazyProperty } from "../../../Utils/OptionsUtils.js";
import { AnimatableColor } from "../AnimatableColor.js";
import { Fill } from "./Fill.js";
import type { IPaint } from "../../Interfaces/Particles/IPaint.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { Stroke } from "./Stroke.js";

/**
 * [[include:Options/Particles/Paint.md]]
 */
export class Paint extends OptionLoader<IPaint> implements IPaint {
  color?: AnimatableColor;
  fill?: Fill;
  stroke?: Stroke;

  protected doLoad(data: RecursivePartial<IPaint>): void {
    if (data.color !== undefined) {
      this.color = AnimatableColor.create(this.color, data.color);
    }

    loadLazyProperty(this, "fill", data.fill, () => new Fill());
    loadLazyProperty(this, "stroke", data.stroke, () => new Stroke());
  }
}
