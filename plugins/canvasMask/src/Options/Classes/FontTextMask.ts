import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IFontTextMask } from "../Interfaces/IFontTextMask.js";

export class FontTextMask implements IFontTextMask, IOptionLoader<IFontTextMask> {
  family = "sans-serif";
  size: string | number = 100;
  style = "";
  variant = "";
  weight = "";

  load(data?: RecursivePartial<IFontTextMask>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "family", data.family);
    loadProperty(this, "size", data.size);
    loadProperty(this, "style", data.style);
    loadProperty(this, "variant", data.variant);
    loadProperty(this, "weight", data.weight);
  }
}
