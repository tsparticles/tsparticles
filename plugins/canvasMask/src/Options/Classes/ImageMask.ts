import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IImageMask } from "../Interfaces/IImageMask";

export class ImageMask implements IImageMask, IOptionLoader<IImageMask> {
    src: string;

    constructor() {
        this.src = "";
    }

    load(data?: RecursivePartial<IImageMask>): void {
        if (!data) {
            return;
        }

        if (data.src !== undefined) {
            this.src = data.src;
        }
    }
}
