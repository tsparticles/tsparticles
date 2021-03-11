import type { IFullScreen } from "../../Interfaces/FullScreen/IFullScreen";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../Types";

export class FullScreen implements IFullScreen, IOptionLoader<IFullScreen> {
    public enable;
    public zIndex;

    constructor() {
        this.enable = false;
        this.zIndex = -1;
    }

    public load(data?: RecursivePartial<IFullScreen>): void {
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
