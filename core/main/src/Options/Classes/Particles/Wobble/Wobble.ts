import type { IWobble } from "../../../Interfaces/Particles/Wobble/IWobble";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import { NumberUtils } from "../../../../Utils";

export class Wobble implements IWobble, IOptionLoader<IWobble> {
    enable: boolean;
    speed: RangeValue;

    constructor() {
        this.enable = false;
        this.speed = 50;
    }

    load(data?: RecursivePartial<IWobble>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            this.speed = NumberUtils.setRangeValue(data.speed);
        }
    }
}
