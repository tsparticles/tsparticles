import type { IRandom } from "../Interfaces/IRandom";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../Types";

export class Random implements IRandom, IOptionLoader<IRandom> {
    public enable;
    public minimumValue;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
    }

    public load(data?: RecursivePartial<IRandom>): void {
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
