import {
    type IOptionLoader,
    type IParticlesOptions,
    type IRangeHsl,
    OptionsColor,
    type RecursivePartial,
    type SingleOrMultiple,
    deepExtend,
    executeOnSingleOrMultiple,
} from "@tsparticles/engine";
import type { ISplit } from "../Interfaces/ISplit.js";
import { SplitFactor } from "./SplitFactor.js";
import { SplitRate } from "./SplitRate.js";

export class Split implements ISplit, IOptionLoader<ISplit> {
    color?: OptionsColor;
    colorOffset?: Partial<IRangeHsl>;
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

        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }

        if (data.count !== undefined) {
            this.count = data.count;
        }

        this.factor.load(data.factor);
        this.rate.load(data.rate);

        this.particles = executeOnSingleOrMultiple(data.particles, particles => {
            return deepExtend({}, particles) as RecursivePartial<IParticlesOptions>;
        });

        if (data.sizeOffset !== undefined) {
            this.sizeOffset = data.sizeOffset;
        }

        if (data.colorOffset) {
            this.colorOffset = this.colorOffset ?? {};

            if (data.colorOffset.h !== undefined) {
                this.colorOffset.h = data.colorOffset.h;
            }

            if (data.colorOffset.s !== undefined) {
                this.colorOffset.s = data.colorOffset.s;
            }

            if (data.colorOffset.l !== undefined) {
                this.colorOffset.l = data.colorOffset.l;
            }
        }
    }
}
