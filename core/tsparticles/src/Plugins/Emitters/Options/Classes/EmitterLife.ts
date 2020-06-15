import type { IEmitterLife } from "../Interfaces/IEmitterLife";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class EmitterLife implements IEmitterLife {
    public count?: number;
    public delay?: number;
    public duration?: number;

    public load(data?: RecursivePartial<IEmitterLife>): void {
        if (data !== undefined) {
            if (data.count !== undefined) {
                this.count = data.count;
            }

            if (data.delay !== undefined) {
                this.delay = data.delay;
            }

            if (data.duration !== undefined) {
                this.duration = data.duration;
            }
        }
    }
}
