import { type IOptionLoader, type RangeValue, type RecursivePartial, isNull, setRangeValue } from "@tsparticles/engine";
import type { IRemove } from "../Interfaces/IRemove.js";

/**
 */
export class Remove implements IRemove, IOptionLoader<IRemove> {
    quantity: RangeValue;

    constructor() {
        this.quantity = 2;
    }

    load(data?: RecursivePartial<IRemove>): void {
        if (isNull(data)) {
            return;
        }

        const quantity = data.quantity;

        if (quantity !== undefined) {
            this.quantity = setRangeValue(quantity);
        }
    }
}
