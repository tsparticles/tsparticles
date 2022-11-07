import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ITextMaskLine } from "../Interfaces/ITextMaskLine";

export class TextMaskLine implements ITextMaskLine, IOptionLoader<ITextMaskLine> {
    separator: string;
    spacing: number;

    constructor() {
        this.separator = "\n";
        this.spacing = 10;
    }

    load(data?: RecursivePartial<ITextMaskLine> | undefined): void {
        if (!data) {
            return;
        }

        if (data.separator !== undefined) {
            this.separator = data.separator;
        }

        if (data.spacing !== undefined) {
            this.spacing = data.spacing;
        }
    }
}
