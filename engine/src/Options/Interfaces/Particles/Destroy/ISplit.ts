import type { IParticles } from "../IParticles";
import type { IValueWithRandom } from "../../IValueWithRandom";
import type { RecursivePartial } from "../../../../Types";

export interface ISplit {
    count: number;
    factor: IValueWithRandom;
    particles?: RecursivePartial<IParticles>;
    rate: IValueWithRandom;
    sizeOffset: boolean;
}
