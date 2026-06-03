import { AnimatableColor } from "../AnimatableColor.js";
import { Fill } from "./Fill.js";
import type { IPaint } from "../../Interfaces/Particles/IPaint.js";
import { OptionLoader } from "../../../Utils/OptionsUtils.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { Stroke } from "./Stroke.js";

/**
 * [[include:Options/Particles/Paint.md]]
 */
export class Paint extends OptionLoader<IPaint> implements IPaint {
  color?: AnimatableColor;
  fill?: Fill;
  stroke?: Stroke;

  doLoad(data: RecursivePartial<IPaint>): void {
    if (data.color !== undefined) {
      this.color = AnimatableColor.create(this.color, data.color);
    }

    if (data.fill !== undefined) {
      this.fill ??= new Fill();
      this.fill.load(data.fill);
    }

    if (data.stroke !== undefined) {
      this.stroke ??= new Stroke();
      this.stroke.load(data.stroke);
    }
  }
}
