import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ITextLinesOptions } from "../Interfaces/ITextLinesOptions.js";

export class TextLinesOptions implements ITextLinesOptions, IOptionLoader<ITextLinesOptions> {
  separator: string;
  spacing: number;

  constructor() {
    this.separator = "\n";
    this.spacing = 0;
  }

  load(data?: RecursivePartial<ITextLinesOptions>): void {
    if (isNull(data)) {
      return;
    }

    if (data.separator !== undefined) {
      this.separator = data.separator;
    }

    if (data.spacing !== undefined) {
      this.spacing = data.spacing;
    }
  }
}
