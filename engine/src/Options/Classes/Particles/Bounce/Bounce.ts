import type { IBounce } from "../../../Interfaces/Particles/Bounce/IBounce";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import { setRangeValue } from "../../../../Utils";

export class Bounce implements IBounce, IOptionLoader<IBounce> {
    horizontal: RangeValue;
    vertical: RangeValue;

    constructor() {
        this.horizontal = 1;
        this.vertical = 1;
    }

    load(data?: RecursivePartial<IBounce>): void {
        if (!data) {
            return;
        }

        if (data.horizontal !== undefined) {
            this.horizontal = setRangeValue(data.horizontal);
        }

        if (data.vertical !== undefined) {
            this.vertical = setRangeValue(data.vertical);
        }
    }
}
