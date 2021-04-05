import type { IPush } from "../../../Interfaces/Interactivity/Modes/IPush";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Push implements IPush, IOptionLoader<IPush> {
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
        this.quantity = 4;
    }

    load(data?: RecursivePartial<IPush>): void {
        if (data === undefined) {
            return;
        }

        const quantity = data.quantity ?? data.particles_nb;

        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}
