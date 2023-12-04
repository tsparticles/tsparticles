import type { IBackgroundMaskCover } from "../../Interfaces/BackgroundMask/IBackgroundMaskCover.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import { OptionsColor } from "../OptionsColor.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";

/**
 */
export class BackgroundMaskCover implements IBackgroundMaskCover, IOptionLoader<IBackgroundMaskCover> {
    color;
    opacity;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#fff";
        this.opacity = 1;
    }

    load(data?: RecursivePartial<IBackgroundMaskCover> | undefined): void {
        if (!data) {
            return;
        }

        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
