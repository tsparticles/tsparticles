import type { IOptionLoader, IParticlesOptions, RecursivePartial, SingleOrMultiple } from "tsparticles-engine";
import { deepExtend, executeOnSingleOrMultiple } from "tsparticles-engine";
import type { ISplit } from "../Interfaces/ISplit";
import { SplitFactor } from "./SplitFactor";
import { SplitRate } from "./SplitRate";

export class Split implements ISplit, IOptionLoader<ISplit> {
    count: number;
    factor: SplitFactor;
    particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
    rate: SplitRate;
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

        this.particles = executeOnSingleOrMultiple(data.particles, (particles) => {
            return deepExtend({}, particles) as RecursivePartial<IParticlesOptions>;
        });

        if (data.sizeOffset !== undefined) {
            this.sizeOffset = data.sizeOffset;
        }
    }
}
