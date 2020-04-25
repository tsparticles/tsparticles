import type { IBackgroundMask } from "../../../Interfaces/Options/BackgroundMask/IBackgroundMask";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IBackgroundMaskCover } from "../../../Interfaces/Options/BackgroundMask/IBackgroundMaskCover";
import { BackgroundMaskCover } from "./BackgroundMaskCover";
import type { IColor } from "../../../Interfaces/IColor";

export class BackgroundMask implements IBackgroundMask {
    /**
     * Background covering color
     */
    public cover: BackgroundMaskCover;

    /**
     * Background mask enabling options
     */
    public enable: boolean;

    constructor() {
        this.cover = new BackgroundMaskCover();
        this.enable = false;
    }

    public load(data?: RecursivePartial<IBackgroundMask>): void {
        if (data !== undefined) {
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
}
