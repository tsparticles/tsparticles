import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IBackgroundMaskCover } from "../Interfaces/IBackgroundMaskCover.js";

/**
 */
export class BackgroundMaskCover implements IBackgroundMaskCover, IOptionLoader<IBackgroundMaskCover> {
    color?: OptionsColor;
    image?: string;
    opacity;

    constructor() {
        this.opacity = 1;
    }

    load(data?: RecursivePartial<IBackgroundMaskCover>): void {
        if (isNull(data)) {
            return;
        }

        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }

        if (data.image !== undefined) {
            this.image = data.image;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
