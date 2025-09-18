import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ITextFontOptions } from "../Interfaces/ITextFontOptions.js";

export class TextFontOptions implements ITextFontOptions, IOptionLoader<ITextFontOptions> {
    family: string;
    size: string | number;
    style: string;
    variant: string;
    weight: string;

    constructor() {
        this.family = "Verdana";
        this.size = 32;
        this.style = "";
        this.variant = "";
        this.weight = "";
    }

    load(data?: RecursivePartial<ITextFontOptions>): void {
        if (isNull(data)) {
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
