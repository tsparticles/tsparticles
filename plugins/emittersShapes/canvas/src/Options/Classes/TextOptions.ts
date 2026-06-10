import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ITextOptions } from "../Interfaces/ITextOptions.js";
import { TextFontOptions } from "./TextFontOptions.js";
import { TextLinesOptions } from "./TextLinesOptions.js";

export class TextOptions implements ITextOptions, IOptionLoader<ITextOptions> {
  color = "#000000";
  readonly font = new TextFontOptions();
  readonly lines = new TextLinesOptions();
  text = "";

  load(data?: RecursivePartial<ITextOptions>): void {
    if (isNull(data)) {
      return;
    }

    if (data.color !== undefined) {
      this.color = data.color;
    }

    this.font.load(data.font);
    this.lines.load(data.lines);

    if (data.text !== undefined) {
      this.text = data.text;
    }
  }
}
