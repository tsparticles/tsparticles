import type { IFullScreen } from "../../Interfaces/FullScreen/IFullScreen";
import { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { RecursivePartial } from "../../../Types";

export class FullScreen implements IFullScreen, IOptionLoader<IFullScreen> {
    enable;
    zIndex;

    constructor() {
        this.enable = false;
        this.zIndex = -1;
    }

    load(data?: RecursivePartial<IFullScreen>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.zIndex !== undefined) {
            this.zIndex = data.zIndex;
        }
    }
}
