import type { ITextFontOptions } from "./ITextFontOptions.js";
import type { ITextLinesOptions } from "./ITextLinesOptions.js";

export interface ITextOptions {
  color: string;
  font: ITextFontOptions;
  lines: ITextLinesOptions;
  text: string;
}
