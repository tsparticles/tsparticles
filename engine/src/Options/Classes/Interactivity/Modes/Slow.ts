import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISlow } from "../../../Interfaces/Interactivity/Modes/ISlow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * @category Options
 */
export class Slow implements ISlow, IOptionLoader<ISlow> {
    /**
     * @deprecated this property will be removed soon, please use the HoverMode.slow in the HoverEvent
     */
    get active(): boolean {
        return false;
    }

    /**
     * @deprecated this property will be removed soon, please use the HoverMode.slow in the HoverEvent
     */
    set active(_value: boolean) {
        // deprecated
    }

    factor;
    radius;

    constructor() {
        this.factor = 3;
        this.radius = 200;
    }

    load(data?: RecursivePartial<ISlow>): void {
        if (!data) {
            return;
        }

        if (data.factor !== undefined) {
            this.factor = data.factor;
        }

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
