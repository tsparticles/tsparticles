import {IBackgroundMask} from "../../../Interfaces/Options/BackgroundMask/IBackgroundMask";
import {IColor} from "../../../Interfaces/Options/Particles/IColor";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class BackgroundMask implements IBackgroundMask {
    public cover?: IColor;
    public enable: boolean;

    constructor() {
        this.enable = false;
    }

    public load(data?: RecursivePartial<IBackgroundMask>): void {
        if (data !== undefined) {
            if (data.cover !== undefined) {
                this.cover = data.cover;
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
}
