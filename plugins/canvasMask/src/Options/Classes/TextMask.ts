import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ITextMask } from "../Interfaces/ITextMask";

export class TextMask implements ITextMask, IOptionLoader<ITextMask> {
    text: string;

    constructor() {
        this.text = "";
    }

    load(data?: RecursivePartial<ITextMask>): void {
        if (!data) {
            return;
        }

        if (data.text !== undefined) {
            this.text = data.text;
        }
    }
}
