import type { ISlow } from "../../../Interfaces/Interactivity/Modes/ISlow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Slow implements ISlow {
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

    public factor: number;
    public radius: number;

    constructor() {
        this.factor = 3;
        this.radius = 200;
    }

    public load(data?: RecursivePartial<ISlow>): void {
        if (data === undefined) {
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
