import type { RangeValue, RecursivePartial } from "../../../../Types";
import type { IParticlesOptions } from "../IParticlesOptions";

export interface ISplit {
    count: number;
    factor: RangeValue;
    particles?: RecursivePartial<IParticlesOptions>;
    rate: RangeValue;
    sizeOffset: boolean;
}
