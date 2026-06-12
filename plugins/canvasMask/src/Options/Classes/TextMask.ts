import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import { FontTextMask } from "./FontTextMask.js";
import type { ITextMask } from "../Interfaces/ITextMask.js";
import { TextMaskLine } from "./TextMaskLine.js";

export class TextMask implements ITextMask, IOptionLoader<ITextMask> {
  color = "#000000";
  fill = true;
  readonly font = new FontTextMask();
  readonly lines = new TextMaskLine();
  text = "";

  load(data?: RecursivePartial<ITextMask>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "color", data.color);
    loadProperty(this, "fill", data.fill);

    this.font.load(data.font);
    this.lines.load(data.lines);

    loadProperty(this, "text", data.text);
  }
}
