import type { IFontTextMask } from "./IFontTextMask";
import type { ITextMaskLine } from "./ITextMaskLine";

export interface ITextMask {
    color: string;
    font: IFontTextMask;
    lines: ITextMaskLine;
    text: string;
}
