import type { RecursivePartial } from "../../../Types";
import { OptionsColor } from "../OptionsColor";
import type { IBackgroundMaskCover } from "../../Interfaces/BackgroundMask/IBackgroundMaskCover";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class BackgroundMaskCover implements IBackgroundMaskCover, IOptionLoader<IBackgroundMaskCover> {
    public color;
    public opacity;

    constructor() {
        this.color = new OptionsColor();
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<IBackgroundMaskCover> | undefined): void {
        if (data === undefined) {
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
