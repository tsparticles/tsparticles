import type { IFontTextMask } from "./IFontTextMask.js";
import type { ITextDataOptions } from "@tsparticles/canvas-utils";
import type { ITextMaskLine } from "./ITextMaskLine.js";

/** The canvas mask text options */
export interface ITextMask extends ITextDataOptions {
  /** Enables the text fill */
  fill: boolean;
  /** The text font options */
  font: IFontTextMask;
  /** The text lines options */
  lines: ITextMaskLine;
}
