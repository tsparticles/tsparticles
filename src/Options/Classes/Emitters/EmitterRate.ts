import type { IEmitterRate } from "../../Interfaces/Emitters/IEmitterRate";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class EmitterRate implements IEmitterRate {
    public quantity: number;
    public delay: number;

    constructor() {
        this.quantity = 1;
        this.delay = 0.1;
    }

    public load(data?: RecursivePartial<IEmitterRate>): void {
        if (data !== undefined) {
            if (data.quantity !== undefined) {
                this.quantity = data.quantity;
            }

            if (data.delay !== undefined) {
                this.delay = data.delay;
            }
        }
    }
}
