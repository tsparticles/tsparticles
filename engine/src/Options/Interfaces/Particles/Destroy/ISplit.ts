import type { RangeValue, RecursivePartial } from "../../../../Types";
import type { IParticles } from "../IParticles";

export interface ISplit {
    count: number;
    factor: RangeValue;
    particles?: RecursivePartial<IParticles>;
    rate: RangeValue;
    sizeOffset: boolean;
}
