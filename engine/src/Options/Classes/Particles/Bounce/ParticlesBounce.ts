import type { IOptionLoader, IParticlesBounce } from "../../../Interfaces";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import { setRangeValue } from "../../../../Utils";

export class ParticlesBounce implements IParticlesBounce, IOptionLoader<IParticlesBounce> {
    horizontal: RangeValue;
    vertical: RangeValue;

    constructor() {
        this.horizontal = 1;
        this.vertical = 1;
    }

    load(data?: RecursivePartial<IParticlesBounce>): void {
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
