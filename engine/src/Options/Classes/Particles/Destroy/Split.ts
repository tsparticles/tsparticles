import type { ISplit } from "../../../Interfaces/Particles/Destroy/ISplit";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { SplitFactor } from "./SplitFactor";
import { RecursivePartial } from "../../../../Types";
import { SplitRate } from "./SplitRate";
import { IParticles } from "../../../Interfaces/Particles/IParticles";
import { deepExtend } from "../../../../Utils";

export class Split implements ISplit, IOptionLoader<ISplit> {
    public count: number;
    public factor: SplitFactor;
    public rate: SplitRate;
    public particles?: RecursivePartial<IParticles>;

    constructor() {
        this.count = 1;
        this.factor = new SplitFactor();
        this.rate = new SplitRate();
    }

    public load(data?: RecursivePartial<ISplit>): void {
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
    }
}
