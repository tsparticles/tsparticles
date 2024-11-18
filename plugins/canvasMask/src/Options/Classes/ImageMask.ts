import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IImageMask } from "../Interfaces/IImageMask.js";

export class ImageMask implements IImageMask, IOptionLoader<IImageMask> {
    src: string;

    constructor() {
        this.src = "";
    }

    load(data?: RecursivePartial<IImageMask>): void {
        if (isNull(data)) {
            return;
        }

        if (data.src !== undefined) {
            this.src = data.src;
        }
    }
}
