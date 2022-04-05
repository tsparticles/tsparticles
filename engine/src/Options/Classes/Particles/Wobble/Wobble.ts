import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IWobble } from "../../../Interfaces/Particles/Wobble/IWobble";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { setRangeValue } from "../../../../Utils/NumberUtils";

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
