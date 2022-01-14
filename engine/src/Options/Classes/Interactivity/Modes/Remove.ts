import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRemove } from "../../../Interfaces/Interactivity/Modes/IRemove";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class Remove implements IRemove, IOptionLoader<IRemove> {
    quantity;

    constructor() {
        this.quantity = 2;
    }

    load(data?: RecursivePartial<IRemove>): void {
        if (!data) {
            return;
        }

        if (data.quantity !== undefined) {
            this.quantity = data.quantity;
        }
    }
}
