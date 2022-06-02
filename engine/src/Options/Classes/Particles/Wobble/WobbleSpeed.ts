import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IWobbleSpeed } from "../../../Interfaces/Particles/Wobble/IWobbleSpeed";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { setRangeValue } from "../../../../Utils/NumberUtils";

export class WobbleSpeed implements IWobbleSpeed, IOptionLoader<IWobbleSpeed> {
    angle: RangeValue;
    move: RangeValue;

    constructor() {
        this.angle = 50;
        this.move = 10;
    }

    load(data?: RecursivePartial<IWobbleSpeed>): void {
        if (!data) {
            return;
        }

        if (data.angle !== undefined) {
            this.angle = setRangeValue(data.angle);
        }

        if (data.move !== undefined) {
            this.move = setRangeValue(data.move);
        }
    }
}
