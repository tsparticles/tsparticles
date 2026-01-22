import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ITextOptions } from "../Interfaces/ITextOptions.js";
import { TextFontOptions } from "./TextFontOptions.js";
import { TextLinesOptions } from "./TextLinesOptions.js";

export class TextOptions implements ITextOptions, IOptionLoader<ITextOptions> {
  color;
  font;
  lines;
  text;

  constructor() {
    this.color = "#000000";
    this.font = new TextFontOptions();
    this.lines = new TextLinesOptions();
    this.text = "";
  }

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
