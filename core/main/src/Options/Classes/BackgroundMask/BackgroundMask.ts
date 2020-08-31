import type { IBackgroundMask } from "../../Interfaces/BackgroundMask/IBackgroundMask";
import type { RecursivePartial } from "../../../Types";
import type { IBackgroundMaskCover } from "../../Interfaces/BackgroundMask/IBackgroundMaskCover";
import { BackgroundMaskCover } from "./BackgroundMaskCover";
import type { IColor } from "../../../Core/Interfaces/IColor";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

export class BackgroundMask implements IBackgroundMask, IOptionLoader<IBackgroundMask> {
    /**
     * Canvas composite operation
     * values here: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
     */
    public composite;

    /**
     * Background covering color
     */
    public cover;

    /**
     * Background mask enabling options
     */
    public enable;

    constructor() {
        this.composite = "destination-out";
        this.cover = new BackgroundMaskCover();
        this.enable = false;
    }

    public load(data?: RecursivePartial<IBackgroundMask>): void {
        if (data === undefined) {
            return;
        }

        if (data.composite !== undefined) {
            this.composite = data.composite;
        }

        if (data.cover !== undefined) {
            const cover = data.cover as IBackgroundMaskCover;
            const color = (typeof data.cover === "string" ? { color: data.cover } : data.cover) as IColor;

            this.cover.load(cover.color !== undefined ? cover : { color: color });
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
