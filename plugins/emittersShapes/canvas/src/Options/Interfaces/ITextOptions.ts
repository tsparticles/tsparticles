import type { ITextDataOptions } from "@tsparticles/canvas-utils";
import type { ITextFontOptions } from "./ITextFontOptions.js";
import type { ITextLinesOptions } from "./ITextLinesOptions.js";

export interface ITextOptions extends ITextDataOptions {
  font: ITextFontOptions;
  lines: ITextLinesOptions;
}
