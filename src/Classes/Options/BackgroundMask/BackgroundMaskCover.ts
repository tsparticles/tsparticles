import type { IColor } from "../../../Interfaces/Options/Particles/IColor";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { Color } from "../Particles/Color";
import type { IBackgroundMaskCover } from "../../../Interfaces/Options/BackgroundMask/IBackgroundMaskCover";

export class BackgroundMaskCover implements IBackgroundMaskCover {
    public color: IColor;
    public opacity: number;

    constructor() {
        this.color = new Color();
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<IBackgroundMaskCover> | undefined): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                this.color.load(data.color);
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
}
