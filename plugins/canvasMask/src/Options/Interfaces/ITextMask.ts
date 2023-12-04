import type { IFontTextMask } from "./IFontTextMask.js";
import type { ITextMaskLine } from "./ITextMaskLine.js";

export interface ITextMask {
    color: string;
    font: IFontTextMask;
    lines: ITextMaskLine;
    text: string;
}
