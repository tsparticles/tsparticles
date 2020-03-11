import {IBackgroundMask} from "../../../Interfaces/Options/BackgroundMask/IBackgroundMask";
import {Utils} from "../../Utils/Utils";

export class BackgroundMask implements IBackgroundMask {
    public cover?: string;
    public enable: boolean;

    constructor() {
        this.enable = false;
    }

    public load(data: IBackgroundMask): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.cover)) {
                this.cover = data.cover;
            }

            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }
        }
    }
}
