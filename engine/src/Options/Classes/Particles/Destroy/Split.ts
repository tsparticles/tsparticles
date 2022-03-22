import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { IParticles } from "../../../Interfaces/Particles/IParticles";
import type { ISplit } from "../../../Interfaces/Particles/Destroy/ISplit";
import { RecursivePartial } from "../../../../Types";
import { SplitFactor } from "./SplitFactor";
import { SplitRate } from "./SplitRate";
import { deepExtend } from "../../../../Utils";

export class Split implements ISplit, IOptionLoader<ISplit> {
    count: number;
    factor: SplitFactor;
    rate: SplitRate;
    particles?: RecursivePartial<IParticles>;
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
            this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticles>;
        }

        if (data.sizeOffset !== undefined) {
            this.sizeOffset = data.sizeOffset;
        }
    }
}
