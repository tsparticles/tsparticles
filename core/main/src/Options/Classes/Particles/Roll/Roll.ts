import type { IRoll } from "../../../Interfaces/Particles/Roll/IRoll";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import { NumberUtils } from "../../../../Utils";

export class Roll implements IRoll, IOptionLoader<IRoll> {
    enable: boolean;
    speed: RangeValue;

    constructor() {
        this.enable = false;
        this.speed = 25;
    }

    load(data?: RecursivePartial<IRoll>): void {
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
