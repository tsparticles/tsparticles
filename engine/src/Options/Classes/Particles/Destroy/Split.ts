import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { IParticlesOptions } from "../../../Interfaces/Particles/IParticlesOptions";
import type { ISplit } from "../../../Interfaces/Particles/Destroy/ISplit";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
import { SplitFactor } from "./SplitFactor";
import { SplitRate } from "./SplitRate";
import { deepExtend } from "../../../../Utils/Utils";

export class Split implements ISplit, IOptionLoader<ISplit> {
    count: number;
    factor: SplitFactor;
    rate: SplitRate;
    particles?: RecursivePartial<IParticlesOptions>;
    sizeOffset: boolean;

    constructor() {
        this.count = 1;
        this.factor = new SplitFactor();
        this.rate = new SplitRate();
        this.sizeOffset = true;
    }

    load(data?: RecursivePartial<ISplit>): void {
        if (!data) {
            return;
        }

        if (data.count !== undefined) {
            this.count = data.count;
        }

        this.factor.load(data.factor);
        this.rate.load(data.rate);

        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticlesOptions>;
        }

        if (data.sizeOffset !== undefined) {
            this.sizeOffset = data.sizeOffset;
        }
    }
}
