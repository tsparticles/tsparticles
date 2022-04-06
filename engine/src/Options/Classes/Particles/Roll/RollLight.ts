import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRollLight } from "../../../Interfaces/Particles/Roll/IRollLight";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { setRangeValue } from "../../../../Utils/NumberUtils";

export class RollLight implements IRollLight, IOptionLoader<IRollLight> {
    enable;
    value: RangeValue;

    constructor() {
        this.enable = false;
        this.value = 0;
    }

    load(data?: RecursivePartial<IRollLight>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }
    }
}
