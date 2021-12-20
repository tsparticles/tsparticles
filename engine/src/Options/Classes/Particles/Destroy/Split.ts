import type { ISplit } from "../../../Interfaces/Particles/Destroy/ISplit";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import type { IParticles } from "../../../Interfaces/Particles/IParticles";
import { deepExtend, setRangeValue } from "../../../../Utils";

export class Split implements ISplit, IOptionLoader<ISplit> {
    count: number;
    factor: RangeValue;
    rate: RangeValue;
    particles?: RecursivePartial<IParticles>;
    sizeOffset: boolean;

    constructor() {
        this.count = 1;
        this.factor = 3;
        this.rate = { min: 4, max: 9 };
        this.sizeOffset = true;
    }

    load(data?: RecursivePartial<ISplit>): void {
        if (!data) {
            return;
        }

        if (data.count !== undefined) {
            this.count = data.count;
        }

        if (data.factor !== undefined) {
            this.factor = setRangeValue(data.factor);
        }

        if (data.rate !== undefined) {
            this.rate = setRangeValue(data.rate);
        }

        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticles>;
        }

        if (data.sizeOffset !== undefined) {
            this.sizeOffset = data.sizeOffset;
        }
    }
}
