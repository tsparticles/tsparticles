import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IImageMaskOverride } from "../Interfaces/IImageMaskOverride";

export class ImageMaskOverride implements IImageMaskOverride, IOptionLoader<IImageMaskOverride> {
    color: boolean;
    opacity: boolean;

    constructor() {
        this.color = true;
        this.opacity = false;
    }

    load(data?: RecursivePartial<IImageMaskOverride>): void {
        if (!data) {
            return;
        }

        if (data.color !== undefined) {
            this.color = data.color;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
