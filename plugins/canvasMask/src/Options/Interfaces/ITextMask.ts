import type { IFontTextMask } from "./IFontTextMask.js";
import type { ITextDataOptions } from "@tsparticles/canvas-utils";
import type { ITextMaskLine } from "./ITextMaskLine.js";

export interface ITextMask extends ITextDataOptions {
  font: IFontTextMask;
  lines: ITextMaskLine;
}
