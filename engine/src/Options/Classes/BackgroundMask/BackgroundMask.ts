import { BackgroundMaskCover } from "./BackgroundMaskCover.js";
import type { IBackgroundMask } from "../../Interfaces/BackgroundMask/IBackgroundMask.js";
import type { IBackgroundMaskCover } from "../../Interfaces/BackgroundMask/IBackgroundMaskCover.js";
import type { IColor } from "../../../Core/Interfaces/Colors.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { isString } from "../../../Utils/Utils.js";

/**
 * [[include:Options/BackgroundMask.md]]
 */
export class BackgroundMask implements IBackgroundMask, IOptionLoader<IBackgroundMask> {
    /**
     * Canvas composite operation
     * values here: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
     */
    composite: GlobalCompositeOperation;

    /**
     * Background covering color
     */
    readonly cover;

    /**
     * Background mask enabling options
     */
    enable;

    constructor() {
        this.composite = "destination-out";
        this.cover = new BackgroundMaskCover();
        this.enable = false;
    }

    load(data?: RecursivePartial<IBackgroundMask>): void {
        if (!data) {
            return;
        }

        if (data.composite !== undefined) {
            this.composite = data.composite;
        }

        if (data.cover !== undefined) {
            const cover = data.cover as IBackgroundMaskCover,
                color = (isString(data.cover) ? { color: data.cover } : data.cover) as IColor;

            this.cover.load(cover.color !== undefined ? cover : { color: color });
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
