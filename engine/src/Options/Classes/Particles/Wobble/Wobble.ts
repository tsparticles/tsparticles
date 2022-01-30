import type { IOptionLoader, IWobble } from "../../../Interfaces";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import { setRangeValue } from "../../../../Utils";

export class Wobble implements IWobble, IOptionLoader<IWobble> {
    distance: RangeValue;
    enable: boolean;
    speed: RangeValue;

    constructor() {
        this.distance = 5;
        this.enable = false;
        this.speed = 50;
    }

    load(data?: RecursivePartial<IWobble>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = setRangeValue(data.distance);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }
    }
}
