import type { IRemove } from "../../../Interfaces/Interactivity/Modes/IRemove";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Remove implements IRemove, IOptionLoader<IRemove> {
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    get particles_nb(): number {
        return this.quantity;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    set particles_nb(value: number) {
        this.quantity = value;
    }

    quantity;

    constructor() {
        this.quantity = 2;
    }

    load(data?: RecursivePartial<IRemove>): void {
        if (data === undefined) {
            return;
        }

        const quantity = data.quantity ?? data.particles_nb;

        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}
