import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IFontTextMask } from "../Interfaces/IFontTextMask";

export class FontTextMask implements IFontTextMask, IOptionLoader<IFontTextMask> {
    family: string;
    size: string | number;
    style?: string;
    variant?: string;
    weight?: string | number;

    constructor() {
        this.family = "sans-serif";
        this.size = 100;
    }

    load(data?: RecursivePartial<IFontTextMask> | undefined): void {
        if (!data) {
            return;
        }

        if (data.family !== undefined) {
            this.family = data.family;
        }

        if (data.size !== undefined) {
            this.size = data.size;
        }

        if (data.style !== undefined) {
            this.style = data.style;
        }

        if (data.variant !== undefined) {
            this.variant = data.variant;
        }

        if (data.weight !== undefined) {
            this.weight = data.weight;
        }
    }
}
