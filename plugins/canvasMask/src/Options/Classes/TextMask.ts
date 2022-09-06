import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import { FontTextMask } from "./FontTextMask";
import type { ITextMask } from "../Interfaces/ITextMask";

export class TextMask implements ITextMask, IOptionLoader<ITextMask> {
    font;
    text;

    constructor() {
        this.font = new FontTextMask();
        this.text = "";
    }

    load(data?: RecursivePartial<ITextMask>): void {
        if (!data) {
            return;
        }

        this.font.load(data.font);

        if (data.text !== undefined) {
            this.text = data.text;
        }
    }
}
