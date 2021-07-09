import type { IRollLight } from "../../../Interfaces/Particles/Roll/IRollLight";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";

export class RollLight implements IRollLight, IOptionLoader<IRollLight> {
    enable;
    value;

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
            this.value = data.value;
        }
    }
}
