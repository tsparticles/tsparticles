import type { IBackgroundMask } from "../../../Interfaces/Options/BackgroundMask/IBackgroundMask";
import type { IColor } from "../../../Interfaces/Options/Particles/IColor";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IBackgroundMaskCover } from "../../../Interfaces/Options/BackgroundMask/IBackgroundMaskCover";
import { BackgroundMaskCover } from "./BackgroundMaskCover";

export class BackgroundMask implements IBackgroundMask {
    /**
     * Background covering color
     */
    public cover: IBackgroundMaskCover | IColor;

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
                this.cover.load(data.cover);
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
}
