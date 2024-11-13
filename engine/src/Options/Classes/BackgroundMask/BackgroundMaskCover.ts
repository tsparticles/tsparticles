import type { IBackgroundMaskCover } from "../../Interfaces/BackgroundMask/IBackgroundMaskCover.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import { OptionsColor } from "../OptionsColor.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { isNull } from "../../../Utils/TypeUtils.js";

/**
 */
export class BackgroundMaskCover implements IBackgroundMaskCover, IOptionLoader<IBackgroundMaskCover> {
    color?: OptionsColor;
    image?: string;
    opacity;

    constructor() {
        this.opacity = 1;
    }

    load(data?: RecursivePartial<IBackgroundMaskCover> | undefined): void {
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
