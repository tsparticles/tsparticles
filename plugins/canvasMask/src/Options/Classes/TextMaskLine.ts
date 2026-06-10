import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ITextMaskLine } from "../Interfaces/ITextMaskLine.js";

export class TextMaskLine implements ITextMaskLine, IOptionLoader<ITextMaskLine> {
  separator: string;
  spacing: number;

  constructor() {
    this.separator = "\n";
    this.spacing = 10;
  }

  load(data?: RecursivePartial<ITextMaskLine>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "separator", data.separator);
    loadProperty(this, "spacing", data.spacing);
  }
}
