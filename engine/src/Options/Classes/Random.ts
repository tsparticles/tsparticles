import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IRandom } from "../Interfaces/IRandom";
import type { RecursivePartial } from "../../Types";

export class Random implements IRandom, IOptionLoader<IRandom> {
    enable;
    minimumValue;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
    }

    load(data?: RecursivePartial<IRandom>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.minimumValue !== undefined) {
            this.minimumValue = data.minimumValue;
        }
    }
}
