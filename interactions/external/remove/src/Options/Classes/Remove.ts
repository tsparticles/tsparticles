import { type IOptionLoader, type RangeValue, type RecursivePartial, setRangeValue } from "@tsparticles/engine";
import type { IRemove } from "../Interfaces/IRemove.js";

/**
 */
export class Remove implements IRemove, IOptionLoader<IRemove> {
    quantity: RangeValue;

    constructor() {
        this.quantity = 2;
    }

    /**
     * @deprecated this property is obsolete, please use the new quantity
     * @returns the particles quantity
     */
    get particles_nb(): RangeValue {
        return this.quantity;
    }

    /**
     * @deprecated this property is obsolete, please use the new quantity
     * @param value -
     */
    set particles_nb(value: RangeValue) {
        this.quantity = setRangeValue(value);
    }

    load(data?: RecursivePartial<IRemove>): void {
        if (!data) {
            return;
        }

        const quantity = data.quantity ?? data.particles_nb;

        if (quantity !== undefined) {
            this.quantity = setRangeValue(quantity);
        }
    }
}
