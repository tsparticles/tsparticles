import type { IBackgroundMode } from "../../Interfaces/BackgroundMode/IBackgroundMode";
import { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { RecursivePartial } from "../../../Types";

export class BackgroundMode implements IBackgroundMode, IOptionLoader<IBackgroundMode> {
    public enable: boolean;
    public zIndex: number;

    constructor() {
        this.enable = false;
        this.zIndex = -1;
    }

    public load(data?: RecursivePartial<IBackgroundMode>): void {
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
