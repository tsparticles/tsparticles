import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { FontTextMask } from "./FontTextMask.js";
import type { ITextMask } from "../Interfaces/ITextMask.js";
import { TextMaskLine } from "./TextMaskLine.js";

export class TextMask implements ITextMask, IOptionLoader<ITextMask> {
    color;
    font;
    lines;
    text;

    constructor() {
        this.color = "#000000";
        this.font = new FontTextMask();
        this.lines = new TextMaskLine();
        this.text = "";
    }

    load(data?: RecursivePartial<ITextMask>): void {
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
