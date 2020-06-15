import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { OptionsColor } from "../OptionsColor";
import type { IBackgroundMaskCover } from "../../Interfaces/BackgroundMask/IBackgroundMaskCover";

export class BackgroundMaskCover implements IBackgroundMaskCover {
    public color: OptionsColor;
    public opacity: number;

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
