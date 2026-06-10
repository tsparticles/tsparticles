import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IFontTextMask } from "../Interfaces/IFontTextMask.js";

export class FontTextMask implements IFontTextMask, IOptionLoader<IFontTextMask> {
  family: string;
  size: string | number;
  style: string;
  variant: string;
  weight: string;

  constructor() {
    this.family = "sans-serif";
    this.size = 100;
    this.style = "";
    this.variant = "";
    this.weight = "";
  }

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
